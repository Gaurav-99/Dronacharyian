const jwt = require('jsonwebtoken');

// Models
const User = require('../models/user');
const Tasks = require('../models/task');

module.exports.
module.exports.logout = async (req, res) => {
  try {
    res.cookie('jwt', False);
    res.render('../views/main/homePage.ejs');

  } catch (err) {
    console.log(err);
  }
};
