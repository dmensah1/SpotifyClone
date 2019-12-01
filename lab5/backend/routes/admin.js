const express = require('express');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const router = express.Router();

//create an admin in the database
router.post('/signup', (req, res, next) => {
  //password hashed before storing in the database
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const admin = new Admin({
      email: req.body.email,
      password: hash
    });
    admin.save()
    .then(result => {
      res.status(201).json({
        message: 'Admin created.',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  });
});

//called upon logins
router.post('/login', (req, res, next) => {
  let adminInfo;
  //checking to see if email of user already exists
  Admin.findOne({ email: req.body.email })
  .then(admin => {
    if(!admin) {
      return res.status(401).json({
        message: "Authorization unsuccessful."
      });
    }
    //here we know that user exists
    //comparing the encrypted password with password in req body
    adminInfo = admin;
    return bcrypt.compare(req.body.password, admin.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Authorization unsuccessful."
      });
    }
    //creating the token, passing the object and password
    const token = jwt.sign({email: adminInfo.email, adminId: adminInfo._id},
      'demir_mensah_from_in_halifax_ns',
      { expiresIn: '1h'}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: "Authorization unsuccessful."
    });
  });
});


module.exports = router;

