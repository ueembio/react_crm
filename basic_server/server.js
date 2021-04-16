const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require("mysql");
const log4js = require('log4js');
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const POLLING_INTERVAL_IN_MINUTES = parseFloat(process.env.POLLING_INTERVAL_IN_MINUTES);
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFromPhone = process.env.TWILIO_FROM_PHONE;
const twilioClient = require('twilio')(twilioAccountSid, twilioAuthToken);

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


//setInterval(pollDatabaseForAlerts, POLLING_INTERVAL_IN_MINUTES * 60 * 1000);


app.use(cors());

app.use('/login', (req, res) => {
  console.log(req.body.username);
  //console.log(req.body.password);
  if (req.body.username && req.body.password) {

    var sql = `SELECT Id, FirstName, LastName, TemperatureUnit, IsAdmin 
      FROM users
      WHERE Username='${req.body.username}' AND Password='${req.body.password}'`;
    connection.query(sql, function (error, result) {
      if (error)
        throw error;

      if (result.length > 0) {
        res.send({
          id: result[0]['Id'],
          token: 'test123',
          temperatureUnit: result[0]['TemperatureUnit'],
          isAdmin: result[0]['IsAdmin'],
          userFullName: result[0]['FirstName'] + ' ' + result[0]['LastName']
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

// Products API
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

app.put('/update_product_set_rule/:id', (req, res) => {
  console.log('in put command');
  console.log(req.params.id)
  console.log(req.body.item);
  console.log(req.body.item.itemMinThreshold);
  console.log(req.body.item.itemMaxThreshold);
  console.log(req.body.item.itemThresholdInterval);

  var sql = `UPDATE product SET MinThreshold='${req.body.item.itemMinThreshold}', MaxThreshold='${req.body.item.itemMaxThreshold}', MaxThresholdIntervalInSeconds='${req.body.item.itemThresholdInterval}' WHERE Id=${req.params.id}`;
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

app.put('/update_product_set_location/:id', (req, res) => {
  console.log('in put command');
  console.log(req.params.id)
  console.log(req.body.item);
  console.log(req.body.item.selectedLocation);

  var sql = `UPDATE product SET ProductLocationId=${req.body.item.selectedLocation} WHERE Id=${req.params.id}`;
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

  var sql = `SELECT p.Name,dd.dt, REPLACE(JSON_EXTRACT(data, "$.payload_fields.TempC_SHT"), '"', '') as temperature, REPLACE(JSON_EXTRACT(data, "$.hardware_serial"), '"', '') as hardware_serial
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

app.get('/products_by_user_by_location/:userId/:locationId', function (req, res) {
  console.log('products_by_user_by_location');
  console.log(req.params.userId)
  console.log(req.params.locationId)

  var sql = `SELECT p.Id, p.Name, p.Description, p.SKU, p.DT 
    FROM product p LEFT JOIN productsrent pr ON p.Id=pr.ProductId
      LEFT JOIN company c ON c.Id=pr.CompanyId
      LEFT JOIN users u ON u.CompanyId=pr.CompanyId
    WHERE pr.RentDT IS NOT NULL AND pr.ReturnDT IS NULL AND u.Id=` + req.params.userId +
    ` AND p.ProductLocationId=` + req.params.locationId;
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    res.status(200).json(result)
  });
});

app.get('/product_alerts/:id/:startDate/:endDate', function (req, res) {
  console.log('in get command');
  console.log(req.params.id)
  console.log(req.params.startDate)
  console.log(req.params.endDate)

  var sql = `SELECT * FROM alert
    WHERE ProductId = ${req.params.id} AND DT >= '${req.params.startDate}' AND DT <= '${req.params.endDate}'
    ORDER BY DT DESC;`
  console.log(sql);
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    //console.log(result);
    res.status(200).json(result)
  });
});

app.put('/update_alert_mark_as_read/:id', (req, res) => {
  console.log('in put update_alert_mark_as_read');
  console.log(req.params.id)
  
  var sql = `UPDATE alert SET ActionTaken=1, ActionTakenOn=now() WHERE Id=${req.params.id}`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      logger.info('error in saving database.');
    } else {
      console.log('data updated in alert');
      logger.info('successfully updated in database.');
    }
    res.status(200).json({ 'message': 'Data updated successfully' });
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
  var sql = `SELECT u.Id, u.FirstName, u.LastName, u.Username, u.Phone, u.Email, u.Password, c.Name Company, u.DT 
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
  console.log(req.body.item.itemPhone);
  console.log(req.body.item.itemEmail);
  console.log(req.body.item.itemCompany);
  console.log(req.body.item.itemTemperatureUnit);
  var sql = `UPDATE users SET FirstName='${req.body.item.itemFirstName}', LastName='${req.body.item.itemLastName}', Password='${req.body.item.itemPassword}', Phone='${req.body.item.itemPhone}', Email='${req.body.item.itemEmail}', CompanyId='${req.body.item.itemCompany}', TemperatureUnit='${req.body.item.itemTemperatureUnit}' WHERE Id=${req.params.id}`;
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

  var sql = `INSERT INTO users (FirstName, LastName, Username, Password, Phone, Email, CompanyId, DT, TemperatureUnit) VALUES ('${req.body.item.itemFirstName}', '${req.body.item.itemLastName}', '${req.body.item.itemUserame}', '${req.body.item.itemPassword}', '${req.body.item.itemPhone}', '${req.body.item.itemEmail}', '${req.body.item.selectedCompany}', NOW(), '${req.body.item.itemTemperatureUnit}')`;
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

// Locations API
app.get('/locations', (req, res) => {
  var sql = 'SELECT * FROM product_location';
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    //console.log(result);
    res.status(200).json(result)
  });
});

app.get('/location/:id', function (req, res) {
  console.log(req.params.id)

  var sql = 'SELECT * FROM product_location WHERE Id=' + req.params.id;
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    console.log(result[0]);
    res.status(200).json(result[0])
  });
});

app.put('/location/:id', (req, res) => {
  console.log('in put command');
  console.log(req.params.id)
  console.log(req.body.item);
  console.log(req.body.item.itemName);

  var sql = `UPDATE product_location SET Name='${req.body.item.itemName}' WHERE Id=${req.params.id}`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      logger.info('error in saving database.');
    } else {
      console.log('data updated in location');
      logger.info('successfully updated in database.');
    }
    res.status(200).json({ 'message': 'Data updated successfully' });
  });
});

app.post('/location', (req, res) => {
  console.log('in post location');
  console.log(req.body.item.itemName);
  console.log(req.body.item.itemUserId);

  var sql = `INSERT INTO product_location (Name, UserId) VALUES ('${req.body.item.itemName}', '${req.body.item.itemUserId}')`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      logger.info('error in saving database.');
    } else {
      console.log('data inserted in location');
      logger.info('successfully saved in database.');
    }
    res.status(200).json({ 'message': 'Data inserted successfully' });
  });
});

app.get('/locations_by_user/:id', function (req, res) {
  console.log('locations_by_user');
  console.log(req.params.id)

  var sql = `SELECT Id, Name
    FROM product_location  
    WHERE UserId=` + req.params.id;
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    res.status(200).json(result)
  });
});

function pollDatabaseForAlerts() {
  //console.log('*** pollDatabaseForAlerts ***');
  //sendMessage('+14804852044', 'test temperature sensor')

  var sql = `SELECT pr.Id, p.Id ProductId, p.Name AS Product, p.MinThreshold, p.MaxThreshold, p.MaxThresholdIntervalInSeconds, p.ThresholdStartDT, DATE_FORMAT(dd.dt,'%Y-%m-%d %H:%i') AS dt, JSON_EXTRACT(data, "$.payload_fields.TempC_SHT") as temperature, REPLACE(JSON_EXTRACT(data, "$.hardware_serial"), '"', '')  as hardware_serial, c.Name AS Company, pr.RentDT, pr.ReturnDT, u.Id AS UserId, u.Phone, u.Email
    FROM product p left join productsrent pr on p.id=pr.ProductId 
      left join company c on pr.CompanyId=c.Id 
        left join users u on pr.CompanyId=u.CompanyId
        LEFT JOIN device_state dd ON p.sku = REPLACE(JSON_EXTRACT(data, "$.hardware_serial"), '"', '')
    WHERE pr.RentDT IS NOT NULL AND pr.ReturnDT IS NULL`
  connection.query(sql, function (error, result) {
    if (error)
      throw error;
    //console.log(result);

    for (var i = 0; i < result.length; i++) {

      //console.log(result[i]);
      //console.log(result[i].temperature);
      //console.log(result[i].dt);
      //console.log(result[i].Phone);
      //console.log(result[i].ThresholdStartDT);
      //console.log(result[i].MaxThresholdIntervalInSeconds);

      try {
        var userId = result[i].UserId;
        var productId = result[i].ProductId;
        var temperature = parseFloat(result[i].temperature);
        var minThreshold = parseFloat(result[i].MinThreshold);
        var maxThreshold = parseFloat(result[i].MaxThreshold);
        var thresholdStartDT = result[i].ThresholdStartDT;
        var maxThresholdIntervalInSeconds = result[i].MaxThresholdIntervalInSeconds;
        var secondsElapsedSinceFirstViolation = 0;

        if (thresholdStartDT != null) {
          console.log('thresholdStartDT != null');
          var difference = (new Date()).getTime() - thresholdStartDT.getTime();
          console.log(difference);
          secondsElapsedSinceFirstViolation = difference / 1000;
          secondsElapsedSinceFirstViolation = Math.abs(secondsElapsedSinceFirstViolation);
          console.log('secondsElapsedSinceFirstViolation');
          console.log(secondsElapsedSinceFirstViolation);
        }

        var isAlert = false;

        if (temperature < minThreshold) {
          var message = `temperature of sensor id ${result[i].Product} dropped below threshold ${minThreshold}`;
          isAlert = true;
        }
        else if (temperature > maxThreshold) {
          var message = `temperature of sensor id ${result[i].Product} crossed threshold ${maxThreshold}`;
          isAlert = true;
        }

        if (isAlert) {
          var sql2 = `UPDATE product SET ThresholdStartDT=now() WHERE id=${result[i].ProductId}`;
        } else {
          var sql2 = `UPDATE product SET ThresholdStartDT=null WHERE id=${result[i].ProductId}`;
        }
        //console.log(sql2);
        connection.query(sql2, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            //console.log('data updated');
          }
        });

        if (isAlert && maxThresholdIntervalInSeconds == 0) {
          var sqlAlert = `INSERT INTO alert (Message, ProductId, UserId) VALUES('${message}', ${userId}, ${productId})`;
          connection.query(sqlAlert, (error, result) => {
            if (error) {
              console.log(error);
            } else {
              console.log('data inserted in alert');
            }
          });
          sendMessage(result[i].phone, message)
        }
        else if (isAlert && (secondsElapsedSinceFirstViolation >= maxThresholdIntervalInSeconds)) {
          message = message + `. Threshold violated ${secondsElapsedSinceFirstViolation} seconds before.`;
          var sqlAlert = `INSERT INTO alert (Message, ProductId, UserId) VALUES('${message}', ${userId}, ${productId})`;
          connection.query(sqlAlert, (error, result) => {
            if (error) {
              console.log(error);
            } else {
              console.log('data inserted in alert');
            }
          });
          sendMessage(result[i].phone, message)
        }

      }
      catch (error) {
        console.log(error);
        logger.log(error);
      }
    }

  });

}

function sendMessage(phone, notification_message) {
  /*
  client.messages
    .create({body: 'Hi there!', from: '+15017122661', to: '+15558675310'})
    .then(message => console.log(message.sid));
  */

  if (!phone) {
    return;
  }
  console.log(twilioFromPhone);
  console.log(phone);

  return twilioClient.messages.create({
    body: notification_message,
    from: twilioFromPhone,
    to: phone
  }).then(message => {
    console.log('twilio message then')
    console.log(message)
  });
}

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));

//FOr Logout
//sessionStorage.clear()
