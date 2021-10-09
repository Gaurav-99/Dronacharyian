const express = require('express');

const userController = require('../controllers/userController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

const routes = express.Router();

routes.get('*', checkUser);

routes.get('/userhomepage', requireAuth, (req, res) => {
  res.render('../views/user/userHomepage.ejs');
});

routes.get('/profile', requireAuth, (req, res) => {
  res.render('../views/user/userProfile.ejs');
});

routes.get('/logout', userController.logout_get);

module.exports = routes;