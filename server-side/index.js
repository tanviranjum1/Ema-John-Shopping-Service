const express = require("express");
const app = express();
const port = 5000;
// for post request
const cors = require("cors");
const bodyParser = require("body-parser");
// use as middleware for post requests.
app.use(cors());
app.use(bodyParser.json());

require("dotenv").config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ttq28tg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// console.log(process.env.DB_USER);

const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.get("/", (req, res) => {
  res.send("hello from db it is working.");
});

client.connect((err) => {
  // perform actions on the collection object
  //
  const collectionproducts = client.db("emaJohn").collection("products");

  // orders collection.
  const collectionorders = client.db("emaJohn").collection("orders");

  console.log("database connected.");

  app.post("/addProduct", (req, res) => {
    const product = req.body;
    console.log(product);
    collectionproducts.insertOne(product).then((result) => {
      console.log(result);
      console.log(result.insertedCount);
      res.send(result.insertedCount);
    });
  });

  // to load all products.
  app.get("/products", (req, res) => {
    collectionproducts.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  // to load single product.
  app.get("/product/:key", (req, res) => {
    collectionproducts
      .find({ key: req.params.key })
      .toArray((err, documents) => {
        // index 0 since we are sending one time only.
        res.send(documents[0]);
      });
  });

  // to laod multiple products or single or none.
  app.post("/productByKeys", (req, res) => {
    const productKeys = req.body;
    collectionproducts
      .find({ key: { $in: productKeys } })
      .toArray((err, documents) => {
        res.send(documents);
        console.log(documents);
      });
  });

  // to add to order collection.
  app.post("/addOrder", (req, res) => {
    const order = req.body;
    console.log(order);
    collectionorders.insertOne(order).then((result) => {
      console.log(result);

      res.send(result.acknowledged); //>0 means order placed.
    });
  });

  // client.connect((err) => {
  //   // client.close();
  // });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.port || port);
