const express = require('express');

const routes = express.Router();


routes.get('/homepage', (req, res) => {
  res.render('../views/main/homePage.ejs');
});

routes.get('/sign', (req, res) => {
  res.render('../views/main/sign.ejs');
});

routes.get('/login', (req, res) => {
  res.render('../views/main/sign.ejs');
});


module.exports = routes;