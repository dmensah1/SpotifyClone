const jwt = require('jsonwebtoken');

//middleware function that verifies the jwt tokens
module.exports = (req, res, next) => {
  try {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'demir_mensah_from_in_halifax_ns');
  next();
  } catch (err) {
    res.status(401).json({
      message: "Authorization unsuccessful."
    });
  }
}
