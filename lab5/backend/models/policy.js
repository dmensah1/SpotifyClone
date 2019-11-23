const mongoose = require('mongoose');

//schema for reviews in the database
const policySchema = mongoose.Schema({
  policy: { type: String, required: true },
});

//defining the name for the model & the schema you want to use
module.exports = mongoose.model('SAndPPolicy', policySchema);
