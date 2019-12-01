//this file is used to create ALL THE ROUTES (POST,PUT,DELETE,GET)
//holds express features
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

//route imports
const songsRoutes = require('./routes/songs');
const reviewsRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const spPolicyRoutes = require('./routes/policy');
const dmcaRoutes = require('./routes/dmca');

const app = express();  //returns us an express app which can now be used

//connecting to my mongoDB Atlas database
mongoose.connect("mongodb+srv://demirmensah:Baburyasemin12@cluster0-y4t5w.mongodb.net/lab5?retryWrites=true&w=majority")
.then(() => {
  console.log('Database connection successfu!');
})
.catch(() => {
  console.log('Database connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//declaring headers
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

//forwarding incoming requests to the appropriate routes
// routes seperated into different folders to keep the code organized
app.use("/api/songs", songsRoutes);

app.use("/api/reviews", reviewsRoutes);

app.use("/api/user", userRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/policy", spPolicyRoutes);

app.use("/api/dmca", dmcaRoutes);

//exporting the module
module.exports = app;
