const express = require("express");
const cors = require("cors");
// var bodyparser = require("body-parser");
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/paperwork");
const mongoclient = require("mongodb").MongoClient;
const { MongoClient } = require("mongodb");
const url = 'mongodb://localhost:27017';
const dbName = 'paperwork';
const client = new MongoClient(url);
var app = new express();

app.use(cors());
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended:true}));

app.get("/users", (res, err) => {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE");
  const db = client.db(dbName);
  const collection = db.collection('users');
  collection.find({})
  .then((details) => {
    console.log(details);
    res.send(details)
  })
})

app.listen(3000, function() {
  console.log("Listening to port 3000");
});