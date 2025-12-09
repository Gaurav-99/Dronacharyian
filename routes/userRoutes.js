const express = require('express');

const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

const routes = express.Router();

routes.get('*', checkUser);

routes.get('/userhomepage', requireAuth, (req, res) => {
  res.render('user/userHomepage');
});

routes.get('/coursePage', requireAuth, (req, res) => {
  res.render('main/coursePage');
});

routes.get('/profile', userController.profile_get);

routes.get('/logout', userController.logout_get);

module.exports = routes;