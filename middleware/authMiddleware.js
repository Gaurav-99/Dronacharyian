const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {

  const token = req.cookies.jwt;

  // Check json web token exists and is verified
  if (token) {
    jwt.verify(token, 'dronaAcharya', (err, decodedToken) => {
      if (err) {
        console.log('err.message');
        res.redirect('/sign');
      } else {
        console.log(decodedToken);
        next();
      }
    })
  } else {
    res.redirect('/sign');
  }
}

// Check Current User
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check json web token exists and is verified
  if (token) {
    jwt.verify(token, 'dronaAcharya', async (err, decodedToken) => {
      if (err) {
        console.log('err.message');
        res.locals.user = null;
        next();
      } else {
        //console.log(decodedToken);
        const user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    })
  } else {
    res.locals.user = null;
  }
}


module.exports = { requireAuth, checkUser };
