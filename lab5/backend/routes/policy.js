const express = require('express');
const Policy = require('../models/policy');

const router = express.Router();

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

router.get('', (req, res, next) => {
  Policy.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'Policy fetched successfully!',
      policy: documents
    });
  });
});

//to edit an existing policy
router.delete("/delete/:policy", (req, res, next) => {
  // we then pass the database type object created to be updated
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

/*
router.delete('/delete/:email', (req, res, next) => {
  User.deleteOne({ email: req.params.email })
  .then(res => {
    res.status(200).json({
      message: 'User deleted successfully.'
    });
  })
  .catch(error => {
    res.status(401).json({
      message: 'Unsuccessful delete.'
    });
  });
});*/

module.exports = router;
