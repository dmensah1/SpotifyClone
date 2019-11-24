const express = require('express');
const DMCA = require('../models/dmca');

const router = express.Router();

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

router.get('', (req, res, next) => {
  DMCA.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: 'DMCA policy fetched successfully!',
      policy: documents
    });
  });
});

module.exports = router;
