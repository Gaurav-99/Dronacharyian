const express = require('express');
const authController = require('../controllers/authController.js');
const routes = express.Router();


routes.post('/signup', authController.signup_post);

routes.post('/login', authController.login_post);

module.exports = routes;