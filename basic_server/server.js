const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

var product = [ {
  'id':1,
  'name':'product 1',
  'pnumber':'SNA12' 
},
{
  'id':2,
  'name':'product 2',
  'pnumber':'SNA13' 
},
{
  'id':3,
  'name':'product 2',
  'pnumber':'SNA12' 
},
{
  'id':4,
  'name':'product 4',
  'pnumber':'SNA14' 
},
{
  'id':5,
  'name':'product 5',
  'pnumber':'SNA15' 
},
{
  'id':6,
  'name':'product 6',
  'pnumber':'SNA16' 
},

]


app.use(cors());

app.use('/login', (req, res) => {
    console.log(req);
    res.send({
      token: 'test123'
    });
});

app.get('/products',(req,res) => {
  console.log(req.body);
  res.send(product);
});

app.post('/products',(req,res) => {
  console.log(req.body);
  //p = JSON.parse(req.body);
  //console.log(p);
  //var user_name = p.itemName;
  //var password = p.itemCode;
  //console.log("User name = "+user_name+", password is "+password);
  res.send(product);
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));


