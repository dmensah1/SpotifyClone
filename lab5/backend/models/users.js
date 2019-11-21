const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
});

userSchema.plugin(unique);

//defining the name for the model & the schema you want to use
module.exports = mongoose.model('User', userSchema);
