const jwt = require('jsonwebtoken');

// Models
const User = require('../models/user');
const Tasks = require('../models/task');

// logout
module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/sign');
}