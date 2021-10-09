const jwt = require('jsonwebtoken');

const Task = require('../models/task');
const User = require('../models/user');


function allTasks(req, res) {

  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'dronaAcharya', (err, decodedToken) => {
      if (err) {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/sign');
        next();
      } else {
        Task.findById(decodedToken.id)
          .then((result) => {
            console.log("Results of get all the tasks:- ", result);
            res.render('taskManager/index', { title: 'All Tasks', tasks: result });
          })
          .catch(errr => console.log(errr));
      }
    })
  } else {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/sign');
  }


}

module.exports = allTasks;