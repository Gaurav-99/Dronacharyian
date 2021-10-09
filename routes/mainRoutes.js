const jwt = require('jsonwebtoken');
const express = require('express');

const routes = express.Router();

function checkUser(req) {
  const token = req.cookies.jwt;
  // Check json web token exists and is verified
  if (token) {
    let res = jwt.verify(token, 'dronaAcharya');

    if (res.id) {
      return true;
    }
    return false;
  } else {
    return false;
  }
}

routes.get('/homepage', (req, res) => {
  if (checkUser(req)) {
    res.redirect('/userhomepage');
  } else {
    res.render('../views/main/homePage.ejs');
  }
});

routes.get('/sign', (req, res) => {

  if (checkUser(req)) {
    res.redirect('/userhomepage');
  } else {
    res.render('../views/main/sign.ejs');
  }
});

routes.get('/login', (req, res) => {

  if (checkUser(req)) {
    res.redirect('/userhomepage');
  } else {
    res.render('../views/main/sign.ejs');
  }
});


module.exports = routes;