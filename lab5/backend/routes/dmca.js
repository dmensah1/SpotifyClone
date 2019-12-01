const express = require('express');
const DMCA = require('../models/dmca');

const router = express.Router();

//creates a new dmca policy in the database
router.post('', (req, res, next) => {
  const dmca = new DMCA({
    policy: req.body.policy,
  });
  dmca.save().then(result => {
    res.status(201).json({
      message: 'DMCA policy added successfully.',
      policyId: policy._id
    });
  });
});

//fetching the dmca policy from the database
router.get('', (req, res, next) => {
  DMCA.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'DMCA policy fetched successfully!',
      policy: documents
    });
  });
});

//to delete an existing dmca policy
router.delete("/delete/:policy", (req, res, next) => {
  DMCA.deleteOne({ policy: req.params.policy })
  .then(result => {
    res.status(200).json({
      message: 'Policy deleted successfully.'
    });
  })
  .catch(err => {
    res.status(401).json({
      message: 'Unsuccessful delete.'
    });
  });
});

module.exports = router;
