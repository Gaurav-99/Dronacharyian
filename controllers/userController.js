const jwt = require('jsonwebtoken');

// Models
const User = require('../models/user');
const Tasks = require('../models/task');

function checkUser(req) {
  const token = req.cookies.jwt;
  // Check json web token exists and is verified
  if (token) {
    let res = jwt.verify(token, 'dronaAcharya');

    if (res.id) {
      User.findById(res.id)
        .then((result) => {
          console.log('profilePage User:-', result)
          return result;
        }).catch((err) => {
          console.log(err);
          return false;
        });

    } else {
      return false;
    }
  } else {
    return false;
  }
}

// logout request
module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/sign');
}

// get profile request
module.exports.profile_get = (req, res) => {

  const token = req.cookies.jwt;
  // Check json web token exists and is verified
  if (token) {

    jwt.verify(token, 'dronaAcharya', (err, decodedToken) => {

      if (err) {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/sign');
        next();
      } else {
        User.findById(decodedToken.id)
          .then((result) => {
            //console.log("Results of get all the tasks:- ", result);
            res.render('user/userProfile', { title: 'User Details', user: result });
          })
          .catch(errr => console.log(errr));
      }

    })
  } else {
    res.redirect('/sign');
  }
}