const express = require('express');
const Song = require('../models/songs');

const router = express.Router();

router.post('', (req, res, next) => {
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

router.get('', (req, res, next) => {
  Song.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Song fetched successfully!',
      songs: documents
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Song.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Song successfully deleted.'
    });
  });
});

module.exports = router;
