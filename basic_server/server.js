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
  database: "inventorydb"
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
  console.log(req);
  res.send({
    token: 'test123'
  });
});

app.get('/products', (req, res) => {
  console.log(req.body);
  var sql = 'SELECT * FROM product';
  connection.query(sql, function (error, result) {
    if (error)
      throw err;
    console.log(result);
    res.status(200).json(result)
  });
});

app.get('/products/:id', function (req, res) {
  console.log('in get command');
  console.log(req.params.id)

  var sql = 'SELECT * FROM product WHERE Id=' + req.params.id;
  connection.query(sql, function (error, result) {
    if (error)
      throw err;
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

//Companies API
app.get('/company',(req,res) => {
  var sql = 'SELECT * FROM company';
  connection.query(sql, function (error, result) {
    if (error)
      throw err;
    console.log(result);
    res.status(200).json(result)
  });
});

app.get('/company/:id', function(req, res) {
  res.send(companies[req.params.id]);
});

//Companies API
app.put('/company/:id', (req, res) => {
  console.log('in put command');
  console.log(req.params.id);
  console.log(req.body.item.name);
  console.log(req.body.item.number);
  console.log(req.body.item.address);
  var sql = `UPDATE company SET Name='${req.body.item.name}', Phone='${req.body.item.number}', Address='${req.body.item.address}' WHERE Id=${req.params.id}`;
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

app.get('/company', (req, res) => {
  //console.log(req.body);
  var sql = 'SELECT * FROM company';
  connection.query(sql, function (error, result) {
    if (error)
      throw err;
    //console.log(result);
    res.status(200).json(result)
  });
});

app.get('/company/:id', function (req, res) {
  console.log('in get company');
  console.log(req.params.id)
  var sql = 'SELECT * FROM company WHERE Id=' + req.params.id;
  connection.query(sql, function (error, result) {
    if (error)
      throw err;
    console.log(result[0]);
    res.status(200).json(result[0])
  });
});

app.put('/rent/:id',(req,res) =>{
  console.log('In Put command');
  console.log(req.body.item.name);  
  console.log(req.body.item.pnumber);
  var p = {'name':req.body.item.name,'pnumber':req.body.item.pnumber};  
  product[req.params.id] = p;
  res.send(product);
});

app.post('/company', (req, res) => {
  //console.log('company post');
  //console.log(req.body.item);

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




app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));

//FOr Logout
//sessionStorage.clear()
