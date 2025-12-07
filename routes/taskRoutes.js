const express = require('express');
const jwt = require('jsonwebtoken');

const Task = require('../models/task');
const User = require('../models/user');

const routes = express.Router();

// get token function
function getUserId(req) {
  const token = req.cookies.jwt;

  if (token) {
    try {
      let res = jwt.verify(token, process.env.JWT_SECRET);
      if (res.id) {
        return res.id;
      } else {
        return null;
      }
    } catch (err) {
      console.log('JWT Verification Error:', err.message);
      return null;
    }
  } else {
    return null;
  }
}


// Here '/' -> '/tasks'
routes.get('/', (req, res) => {

  if (!getUserId(req)) {
    res.redirect('/sign');
  } else {
    const userId = getUserId(req);
    User.findById(userId)
      .then((user) => {
        Task.find({ userId: userId }).sort({ createdAt: -1 })
          .then((result) => {
            console.log("Results of get all the tasks:- ", result);
            res.render('taskManager/index', { title: 'All Tasks', tasks: result, user: user });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
});

routes.get('/add', (req, res) => {
  if (!getUserId(req)) {
    res.redirect('./sign');
  } else {
    const userId = getUserId(req);
    User.findById(userId)
      .then((user) => {
        res.render('taskManager/add', { title: 'add a new task', user: user });
      })
      .catch(err => console.log(err));
  }
});

routes.get('/:id', (req, res) => {

  if (!getUserId(req)) {
    res.redirect('/sign');
  }
  const id = req.params.id;
  const userId = getUserId(req);
  User.findById(userId)
    .then((user) => {
      Task.findById(id)
        .then((result) => {
          res.render('taskManager/detail', { title: 'task details', task: result, user: user });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});


// Add a new task
routes.post('/add', (req, res) => {

  const userId = getUserId(req);
  if (!userId) {
    res.redirect('/sign');
  }

  const newTask = req.body;
  newTask["userId"] = userId;
  newTask["completed"] = false;

  console.log(newTask);
  const task = new Task(newTask);

  task.save()
    .then((result) => {
      res.redirect('/tasks');
    })
    .catch(err => console.log(err));
});

// Update a task to completed
routes.put('/:id', (req, res) => {

  const task = new Task({
    _id: req.params.id,
    description: req.params.description,
    completed: true
  });

  Task.updateOne({ _id: req.params.id }, task)
    .then((result) => {
      res.json({ redirect: '/tasks' })
    })
    .catch(err => console.log(err));

});

routes.delete('/:id', (req, res) => {
  const id = req.params.id;

  Task.findByIdAndDelete(id)
    .then((results) => {
      res.json({ redirect: '/tasks' });
    })
    .catch(err => console.log(err));

});

module.exports = routes;