const express = require('express');
const jwt = require('jsonwebtoken');

const Task = require('../models/task');

const routes = express.Router();

// get token function
function getUserId(req) {
  const token = req.cookies.jwt;

  if (token) {
    let res = jwt.verify(token, 'dronaAcharya');
    if (res.id) {
      return res.id;
    } else {
      return null;
    }
  } else {
    return null;
    ///res.redirect('/sign');
  }
}


// Here '/' -> '/tasks'
routes.get('/', (req, res) => {

  if (!getUserId(req)) {
    res.redirect('/sign');
  }
  else {
    Task.find().sort({ createdAt: -1 })
      .then((result) => {
        console.log("Results of get all the tasks:- ", result);
        res.render('../views/taskManager/index', { title: 'All Tasks', tasks: result });
      })
      .catch(err => console.log(err));
  }
});

routes.get('/add', (req, res) => {
  if (!getUserId(req)) {
    res.redirect('./sign');
  } else {
    res.render('../views/taskManager/add', { title: 'add a new task' });
  }
});

routes.get('/:id', (req, res) => {

  if (!getUserId(req)) {
    res.redirect('/sign');
  }
  const id = req.params.id;
  Task.findById(id)
    .then((result) => {
      res.render('../views/taskManager/detail', { title: 'task details', task: result });
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