const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require("mysql");
const log4js = require('log4js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

log4js.configure({
  appenders: { mylogger: { type: "file", filename: "site.log" } },
  categories: { default: { appenders: ["mylogger"], level: "ALL" } }
});
const logger = log4js.getLogger("default");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pakistan",
  database: "sensor_management"
});

// open the MySQL connection
connection.connect(error => {
  if (error) {
    logger.error('Database connection error.');
    throw error;
  }
  console.log("Successfully connected to the database.");
  logger.info('Successfully connected to the database.');
});

app.use(cors());

app.use('/login', (req, res) => {
  console.log(req.body.username);
  //console.log(req.body.password);
  if (req.body.username && req.body.password) {

    var sql = `SELECT Id, FirstName, LastName, IsAdmin 
      FROM users
      WHERE Username='${req.body.username}' AND Password='${req.body.password}'`;
    connection.query(sql, function (error, result) {
      if (error)
        throw error;

      if (result.length > 0) {
        res.send({
          id: result[0]['Id'],
          token: 'test123',
          isAdmin: result[0]['IsAdmin']
        });
      }
      else {
        res.send({ token: '', isAdmin: '0' });
      }

    });

  } else {
    res.send({ token: '', isAdmin: '0' });
  }

});

app.get('/products', (req, res) => {
  var sql = 'SELECT * FROM product';
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    //console.log(result);
    res.status(200).json(result)
  });
});

app.get('/get_available_products', (req, res) => {
  console.log('get_available_products');
  var sql = `SELECT p.Id, p.Name 
  FROM product p 
  WHERE (p.Id NOT IN (SELECT productid FROM productsrent pr)) OR 
    (p.Id NOT IN (SELECT productid FROM productsrent pr WHERE pr.rentDT IS NOT NULL AND pr.returnDT IS NULL)) 
  ORDER BY p.Name`;
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    //console.log(result);
    res.status(200).json(result)
  });
});

app.get('/products/:id', function (req, res) {
  console.log('in get command');
  console.log(req.params.id)

  var sql = 'SELECT * FROM product WHERE Id=' + req.params.id;
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    console.log(result[0]);
    res.status(200).json(result[0])
  });
});

app.put('/products/:id', (req, res) => {
  console.log('in put command');
  console.log(req.params.id)
  console.log(req.body.item);
  console.log(req.body.item.name);
  console.log(req.body.item.pnumber);

  var sql = `UPDATE product SET Name='${req.body.item.itemName}', Description='${req.body.item.itemDescription}', SKU='${req.body.item.itemSKU}' WHERE Id=${req.params.id}`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      logger.info('error in saving database.');
    } else {
      console.log('data updated in product');
      logger.info('successfully updated in database.');
    }
    res.status(200).json({ 'message': 'Data updated successfully' });
  });
});

app.post('/products', (req, res) => {
  console.log('in post products');
  console.log(req.body.item.itemName);
  console.log(req.body.item.itemDescription);
  console.log(req.body.item.itemSKU);

  var sql = `INSERT INTO product (Name, Description, SKU, Price) VALUES ('${req.body.item.itemName}', '${req.body.item.itemDescription}', '${req.body.item.itemSKU}', '0.00')`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      logger.info('error in saving database.');
    } else {
      console.log('data inserted in product');
      logger.info('successfully saved in database.');
    }
    res.status(200).json({ 'message': 'Data inserted successfully' });
  });
});

app.get('/product_data/:id', function (req, res) {
  console.log('in get command');
  console.log(req.params.id)

  var sql = `SELECT p.Name,dd.dt, JSON_EXTRACT(data, "$.payload_fields.TempC_SHT") as temperature, REPLACE(JSON_EXTRACT(data, "$.hardware_serial"), '"', '')  as hardware_serial
    FROM product p LEFT JOIN device_data dd ON p.sku = REPLACE(JSON_EXTRACT(data, "$.hardware_serial"), '"', '')
    WHERE p.id = ${req.params.id}
    ORDER BY dd.dt DESC;`
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    //console.log(result);
    res.status(200).json(result)
  });
});

app.get('/product_data/:id/:startDate/:endDate', function (req, res) {
  console.log('in get command');
  console.log(req.params.id)
  console.log(req.params.startDate)
  console.log(req.params.endDate)

  var sql = `SELECT p.Name,dd.dt, JSON_EXTRACT(data, "$.payload_fields.TempC_SHT") as temperature, REPLACE(JSON_EXTRACT(data, "$.hardware_serial"), '"', '')  as hardware_serial
    FROM product p LEFT JOIN device_data dd ON p.sku = REPLACE(JSON_EXTRACT(data, "$.hardware_serial"), '"', '')
    WHERE p.id = ${req.params.id} AND dd.dt >= '${req.params.startDate}' AND dd.dt <= '${req.params.endDate}'
    ORDER BY dd.dt DESC;`
  console.log(sql);
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    //console.log(result);
    res.status(200).json(result)
  });
});

app.get('/products_by_user/:id', function (req, res) {
  console.log('products_by_user');
  console.log(req.params.id)

  var sql = `SELECT p.Id, p.Name, p.Description, p.SKU, p.DT 
    FROM product p LEFT JOIN productsrent pr ON p.Id=pr.ProductId
      LEFT JOIN company c ON c.Id=pr.CompanyId
      LEFT JOIN users u ON u.CompanyId=pr.CompanyId
    WHERE pr.RentDT IS NOT NULL AND pr.ReturnDT IS NULL AND u.Id=` + req.params.id;
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    res.status(200).json(result)
  });
});

// Companies API
app.get('/company', (req, res) => {
  var sql = 'SELECT * FROM company';
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    //console.log(result);
    res.status(200).json(result)
  });
});

app.put('/company/:id', (req, res) => {
  console.log('in put command');
  console.log(req.params.id);
  console.log(req.body.item.itemName);
  console.log(req.body.item.itemNumber);
  console.log(req.body.item.itemAddress);
  var sql = `UPDATE company SET Name='${req.body.item.itemName}', Phone='${req.body.item.itemNumber}', Address='${req.body.item.itemAddress}' WHERE Id=${req.params.id}`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      logger.info('error in saving database.');
    } else {
      console.log('data updated in company');
      logger.info('successfully updated in database.');
    }
    res.status(200).json({ 'message': 'Data updated successfully' });
  });
});

app.get('/company/:id', function (req, res) {
  console.log('in get company');
  console.log(req.params.id)
  var sql = 'SELECT * FROM company WHERE Id=' + req.params.id;
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    console.log(result[0]);
    res.status(200).json(result[0])
  });
});

app.post('/company', (req, res) => {
  console.log('company post');
  console.log(req.body.item);

  var sql = `INSERT INTO company (Name, Phone, Email, Address) VALUES ('${req.body.item.name}', '${req.body.item.number}', '', '${req.body.item.address}')`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      logger.info('error in saving database.');
    } else {
      console.log('data inserted in company');
      logger.info('successfully saved in database.');
    }
    res.status(200).json({ 'message': 'Data inserted successfully' });
  });

});

// Lease API
app.get('/rents', (req, res) => {
  var sql = `SELECT pr.Id, p.Name AS Product, c.Name AS Company, pr.RentDT, pr.ReturnDT
    FROM product p left join productsrent pr on p.id=pr.ProductId left join company c on pr.CompanyId=c.Id
    WHERE pr.RentDT IS NOT NULL
    ORDER BY pr.RentDT DESC`;
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    //console.log(result);
    res.status(200).json(result)
  });
});

app.get('/rents_by_lease_status/:id', (req, res) => {
  console.log(req.params.id);
  var sql = ""
  switch (parseInt(req.params.id, 10)) {
    case 1: // leased
      sql = `SELECT pr.Id, p.Name AS Product, c.Name AS Company, pr.RentDT, pr.ReturnDT
        FROM product p left join productsrent pr on p.id=pr.ProductId left join company c on pr.CompanyId=c.Id
        WHERE pr.RentDT IS NOT NULL AND pr.ReturnDT IS NULL
        ORDER BY pr.RentDT DESC`;
      break;
    case 2: // not leased
      sql = `SELECT p.Id, p.Name AS Product, '' AS Company, '' AS RentDT, '' AS ReturnDT
      FROM product p 
      WHERE (p.Id NOT IN (SELECT productid FROM productsrent pr)) OR 
        (p.Id NOT IN (SELECT productid FROM productsrent pr WHERE pr.rentDT IS NOT NULL AND pr.returnDT IS NULL))
        ORDER BY p.Name`;
      break;
    case 3: // all
      sql = `SELECT pr.Id, p.Name AS Product, c.Name AS Company, pr.RentDT, pr.ReturnDT
        FROM product p left join productsrent pr on p.id=pr.ProductId left join company c on pr.CompanyId=c.Id
        WHERE pr.RentDT IS NOT NULL
        ORDER BY pr.RentDT DESC`;
      break;
  }

  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    //console.log(result);
    res.status(200).json(result)
  });
});

app.post('/rents', (req, res) => {
  console.log('in post rent');
  //console.log(req.body.item);
  //console.log(req.body.item.selectedCompany);
  //console.log(req.body.item.selectedCompany);

  //var datetime = new Date();

  var sql = `INSERT INTO productsrent (CompanyId, ProductId, RentDT) VALUES ('${req.body.item.selectedCompany}', '${req.body.item.selectedProduct}', NOW())`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      logger.info('error in saving database.');
    } else {
      console.log('data inserted in productsrent');
      logger.info('successfully saved in database.');
    }
    res.status(200).json({ 'message': 'Data inserted successfully' });
  });
});

app.get('/rent/:id', function (req, res) {
  var sql = `SELECT pr.Id, p.Name AS Product, c.Name AS Company, pr.RentDT, pr.ReturnDT
    FROM product p left join productsrent pr on p.id=pr.ProductId left join company c on pr.CompanyId=c.Id
    WHERE pr.Id=` + req.params.id;
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    console.log(result[0]);
    res.status(200).json(result[0])
  });
});

app.put('/rent/:id', (req, res) => {
  console.log('In Put command');
  console.log(req.params.id);
  console.log(req.body.item.dt);
  var sql = `UPDATE productsrent SET ReturnDT='${req.body.item.dt}' WHERE Id=${req.params.id}`;
  console.log(sql);
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      logger.info('error in saving database.');
    } else {
      console.log('data updated in productsrent');
      logger.info('successfully updated in database.');
    }
    res.status(200).json({ 'message': 'Data updated successfully' });
  });
});

// Users API
app.get('/users', (req, res) => {
  var sql = `SELECT u.Id, u.FirstName, u.LastName, u.Username, u.Email, u.Password, c.Name Company, u.DT 
    FROM users u LEFT JOIN company c ON u.CompanyId = c.Id`;
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    //console.log(result);
    res.status(200).json(result)
  });
});

app.put('/users/:id', (req, res) => {
  console.log('in put command');
  console.log(req.params.id);
  console.log(req.body.item.itemFirstName);
  console.log(req.body.item.itemLastName);
  console.log(req.body.item.itemPassword);
  console.log(req.body.item.itemEmail);
  console.log(req.body.item.itemCompany);
  var sql = `UPDATE users SET FirstName='${req.body.item.itemFirstName}', LastName='${req.body.item.itemLastName}', Password='${req.body.item.itemPassword}', Email='${req.body.item.itemEmail}', CompanyId='${req.body.item.itemCompany}' WHERE Id=${req.params.id}`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      logger.info('error in saving database.');
    } else {
      console.log('data updated in user');
      logger.info('successfully updated in database.');
    }
    res.status(200).json({ 'message': 'Data updated successfully' });
  });
});

app.get('/users/:id', function (req, res) {
  console.log('in get user');
  console.log(req.params.id)
  var sql = 'SELECT * FROM users WHERE Id=' + req.params.id;
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    console.log(result[0]);
    res.status(200).json(result[0])
  });
});

app.post('/users', (req, res) => {
  console.log('company post');
  console.log(req.body.item);

  var sql = `INSERT INTO users (FirstName, LastName, Username, Password, Email, CompanyId, DT) VALUES ('${req.body.item.itemFirstName}', '${req.body.item.itemLastName}', '${req.body.item.itemUserame}', '${req.body.item.itemPassword}', '${req.body.item.itemEmail}', '${req.body.item.selectedCompany}', NOW())`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      logger.info('error in saving database.');
    } else {
      console.log('data inserted in users');
      logger.info('successfully saved in database.');
    }
    res.status(200).json({ 'message': 'Data inserted successfully' });
  });

});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));

//FOr Logout
//sessionStorage.clear()
