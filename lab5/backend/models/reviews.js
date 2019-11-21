const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  rating: { type: Number, required: true },
  review: { type: String, required: true, maxlength: 240 },
  //creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, //enable once authorization is done
  songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true}
});

//defining the name for the model & the schema you want to use
module.exports = mongoose.model('Post', reviewSchema);
