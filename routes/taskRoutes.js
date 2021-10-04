const express = require('express');
const Task = require('../models/task');

const router = express.Router();

// Here '/' -> '/tasks'
router.get('/tasks', (req, res) => {

  Task.find().sort({ createdAt: -1 })
    .then((result) => {
      console.log("Results of get all the tasks:- ", result);
      res.render('index', { title: 'All Tasks', tasks: result });
    })
    .catch(err => console.log(err));

});

router.get('/tasks/add', (req, res) => {
  res.render('add', { title: 'add a new task' });
});

router.get('/tasks/:id', (req, res) => {
  const id = req.params.id;
  Task.findById(id)
    .then((result) => {
      res.render('detail', { title: 'task details', task: result });
    })
    .catch(err => console.log(err));
});


// Add a new task
router.post('/tasks', (req, res) => {
  const newTask = req.body;
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
router.put('/tasks/:id', (req, res) => {

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

router.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;

  Task.findByIdAndDelete(id)
    .then((results) => {
      res.json({ redirect: '/tasks' });
    })
    .catch(err => console.log(err));

});

module.exports = router;