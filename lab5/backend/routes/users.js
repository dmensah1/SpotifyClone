const express = require('express');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

//creating a new user in database
router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      isActive: req.body.isActive
    });
    user.save()
    .then(result => {
      res.status(201).json({
        message: 'User created.',
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

router.post('/login', (req, res, next) => {
  let userInfo;
  //checking to see if email of user already exists
  User.findOne({ email: req.body.email })
  .then(user => {
    if(!user) {
      return res.status(401).json({
        message: "Authorization unsuccessful."
      });
    }
    //here we know that user exists
    //comparing the encrypted password with password in req body
    userInfo = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Authorization unsuccessful."
      });
    }
    //creating the token, passing the object and password
    const token = jwt.sign({email: userInfo.email, userId: userInfo._id},
      'demir_mensah_from_in_halifax_ns',
      { expiresIn: '1h'}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      isActive: userInfo.isActive
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: "Authorization unsuccessful."
    });
  });
});

//deleting a user based on the email passed in req parameter
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
});


module.exports = router;
