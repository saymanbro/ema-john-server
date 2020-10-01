const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(cors()) 




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p7276.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("eocmarceProduct").collection("products");
  app.post("/addProduct", (req, res) => {
    const product = req.body 
    collection.insertOne(product)
    .then(result => {
      console.log(result);
    })
  })
  
 
});







 

app.listen(5000)