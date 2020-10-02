const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(cors()) 




const uri = 'mongodb+srv://emaJohnWatson:emajohn9900@cluster0.p7276.mongodb.net/ecomarceProduct?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productsCollection = client.db("eocmarceProduct").collection("products");
  const ordersCollection = client.db("eocmarceProduct").collection("orders");
  app.post("/addProduct", (req, res) => {
    const product = req.body 
    productsCollection.insertOne(product)
    .then(result => { 
     res.send(result.insertedCount)
    })
  })


  app.get('/products', (req, res) => {
    productsCollection.find({})
    .toArray((err, documents) => {
      res.send(documents)
    })
  })


  app.get('/product/:key', (req, res) => {
    productsCollection.find({key: req.params.key})
    .toArray((err, documents) => {
      res.send(documents[0])
    })
  })

  app.post("/addOrder", (req, res) => {
    const order = req.body 
    ordersCollection.insertOne(order)
    .then(result => { 
     res.send(result.insertedCount > 0)
    })
  })

});







 

app.listen(process.env.PORT || 5000)