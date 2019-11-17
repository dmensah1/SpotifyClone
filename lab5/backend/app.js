//this file is used to create ALL THE ROUTES (POST,PUT,DELETE,GET)
//holds express features
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

//const postsRoutes = require('./routes/posts');

const app = express();  //returns us an express app which can now be used

//THIS DB LINK MIGHT NEED UPDATING
mongoose.connect("mongodb+srv://dmensah4:Demirmensah12@cluster0-fvkyt.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

//any request starting with path /api/posts will be forwarded into the postsRoutes file
//app.use("/api/posts",postsRoutes);

//export
module.exports = app;
