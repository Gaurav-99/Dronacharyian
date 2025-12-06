const jwt = require('jsonwebtoken');
const express = require('express');

const routes = express.Router();

function checkUser(req) {
  const token = req.cookies.jwt;
  // Check json web token exists and is verified
  if (token) {
    let res = jwt.verify(token, process.env.JWT_SECRET);

    if (res.id) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

routes.get('/homepage', (req, res) => {
  if (checkUser(req)) {
    res.redirect('/userhomepage');
  } else {
    res.render('main/homePage');
  }
});

routes.get('/sign', (req, res) => {

  if (checkUser(req)) {
    res.redirect('/userhomepage');
  } else {
    res.render('main/sign');
  }
});

routes.get('/login', (req, res) => {

  if (checkUser(req)) {
    res.redirect('/userhomepage');
  } else {
    res.render('main/sign');
  }
});


module.exports = routes;