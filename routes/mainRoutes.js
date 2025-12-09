const jwt = require('jsonwebtoken');
const express = require('express');
const { checkUser } = require('../middleware/authMiddleware');

const routes = express.Router();

routes.get('/coursePage', checkUser, (req, res) => {
  res.render('main/coursePage');
});

routes.get('/updates', checkUser, (req, res) => {
  res.render('main/updates'); // Render the updates page
});

routes.get('/sign', checkUser, (req, res) => {
  if (res.locals.user) {
    res.redirect('/coursePage');
  } else {
    res.render('main/sign');
  }
});

routes.get('/login', checkUser, (req, res) => {
  if (res.locals.user) {
    res.redirect('/coursePage');
  } else {
    res.render('main/sign');
  }
});


module.exports = routes;