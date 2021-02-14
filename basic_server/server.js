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

app.put('/products/:id', (req, res) => {
  console.log('In Put command');
  console.log(req.body.item.name);
  console.log(req.body.item.pnumber);
  var p = { 'name': req.body.item.name, 'pnumber': req.body.item.pnumber };
  product[req.params.id] = p;
  res.send(product);
});

app.get('/products', (req, res) => {
  console.log(req.body);
  res.send(product);
});

app.get('/products/:id', function (req, res) {
  res.send(product[req.params.id]);
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

    res.send(product);
  });
});
  
app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));


