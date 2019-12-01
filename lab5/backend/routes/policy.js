const express = require('express');
const Policy = require('../models/policy');

const router = express.Router();

//creates a new policy in the database
router.post('', (req, res, next) => {
  const policy = new Policy({
    policy: req.body.policy,
  });
  policy.save().then(result => {
    res.status(201).json({
      message: 'Policy added successfully.',
      policyId: policy._id
    });
  });
});

// retrieves policy from database and return it
router.get('', (req, res, next) => {
  Policy.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Policy fetched successfully!',
      policy: documents
    });
  });
});

//to delete an existing policy
router.delete("/delete/:policy", (req, res, next) => {
  Policy.deleteOne({ policy: req.params.policy })
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
