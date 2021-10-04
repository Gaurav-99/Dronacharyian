const express = require('express');
const userController = require('../controllers/userController.js');

const routes = express.Router();

routes.get('/userhomepage', (req, res) => {
  res.render('../views/user/userHomepage.ejs');
});

routes.get('/profile', (req, res) => {
  res.render('../views/user/userProfile.ejs');
});

routes.get('/tasks', (req, res) => {
  res.render('../views/taskManager/index.ejs');
});

routes.get('/logout', userConntroller.logout);

module.exports = routes;