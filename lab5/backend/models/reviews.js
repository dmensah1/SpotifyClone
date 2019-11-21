const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  rating: { type: Number, required: true },
  review: { type: String, required: true, maxlength: 240 },
  songName: { type: String, ref: 'Song', required: true}
});

//defining the name for the model & the schema you want to use
module.exports = mongoose.model('Reviews', reviewSchema);
