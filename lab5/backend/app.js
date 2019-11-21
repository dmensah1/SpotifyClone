//this file is used to create ALL THE ROUTES (POST,PUT,DELETE,GET)
//holds express features
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const songsRoutes = require('./routes/songs');

const app = express();  //returns us an express app which can now be used

//THIS DB LINK MIGHT NEED UPDATING
mongoose.connect("mongodb+srv://demirmensah:Baburyasemin12@cluster0-y4t5w.mongodb.net/lab5?retryWrites=true&w=majority")
.then(() => {
  console.log('Database connection successfu!');
})
.catch(() => {
  console.log('Database connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});



//any request starting with path /api/posts will be forwarded into the postsRoutes file
app.use("/api/songs",songsRoutes);

//export
module.exports = app;
