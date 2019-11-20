//creating the model for posts to be used with the databse
//this is just the blueprint/parameters for our data
const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
  title: { type: String, required: true, maxlength: 30 },
  artist: { type: String, required: true, maxlength: 30 },
  album: { type: String, maxlength: 30 },
  year: { type: Number},
  comment: { type: String, maxlength: 30 },
  track: { type: Number},
  genre: { type: String, maxlength: 15 }
  //creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

//defining the name for the model & the schema you want to use
module.exports = mongoose.model('Song', songSchema);
