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

app.put('/products/:id',(req,res) =>{
  console.log('In Put command');
  console.log(req.body.item.name);  
  console.log(req.body.item.pnumber);
  var p = {'name':req.body.item.name,'pnumber':req.body.item.pnumber};  
  product[req.params.id] = p;
  res.send(product);
});

app.get('/products',(req,res) => {
  console.log(req.body);
  res.send(product);
});

app.get('/products/:id', function(req, res) {
  res.send(product[req.params.id]);
});


app.post('/products',(req,res) => {  
  console.log('In Post command');
  console.log(req.body.item.itemName);  
  console.log(req.body.item.itemCode);
  var p = {'id':product.length+1,'name':req.body.item.itemName,'pnumber':req.body.item.itemCode};  
  product.push(p);
  res.send(product);
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));


