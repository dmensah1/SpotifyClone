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

module.exports = router;
