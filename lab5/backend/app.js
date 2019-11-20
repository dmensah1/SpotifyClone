//this file is used to create ALL THE ROUTES (POST,PUT,DELETE,GET)
//holds express features
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Song = require('./models/songs');

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

app.post('/api/songs', (req, res, next) => {
  const song = new Song({
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    year: req.body.year,
    comment: req.body.comment,
    track: req.body.track,
    genre: req.body.genre
  });
  song.save().then(result => {
    res.status(201).json({
      message: 'Song added successfully.',
      songId: result._id
    });
  });

});

app.get('/api/songs', (req, res, next) => {
  Song.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Song fetched successfully!',
      songs: documents
    });
  });
});

app.delete('/api/songs/:id', (req, res, next) => {
  Song.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Song successfully deleted.'
    });
  });
});

//any request starting with path /api/posts will be forwarded into the postsRoutes file
//app.use("/api/posts",postsRoutes);

//export
module.exports = app;
