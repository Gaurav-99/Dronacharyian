const Task = require('../models/task');
const jwt = require('jsonwebtoken');

const task_index = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/sign');
      } else {
        Task.find({ userId: decodedToken.id }).sort({ createdAt: -1 })
          .then(result => {
            res.render('taskManager/index', { title: 'All Tasks', tasks: result });
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
  } else {
    res.redirect('/sign');
  }
}

const task_details = (req, res) => {
  const id = req.params.id;
  Task.findById(id)
    .then(result => {
      res.render('taskManager/detail', { task: result, title: 'Task Details' });
    })
    .catch(err => {
      res.status(404).render('404', { title: 'Task not found' });
    });
}

const task_create_get = (req, res) => {
  res.render('taskManager/add', { title: 'Create a new task' });
}

const task_create_post = (req, res) => {
  const task = new Task(req.body);
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/tasks/create');
      } else {
        task.userId = decodedToken.id;
        task.save()
          .then(result => {
            res.redirect('/tasks');
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
  } else {
    res.redirect('/tasks/create');
  }
}

const task_delete = (req, res) => {
  const id = req.params.id;
  Task.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/tasks' });
    })
    .catch(err => {
      console.log(err);
    });
}

const task_calendar_get = (req, res) => {
  res.render('taskManager/calendar', { title: 'My Calendar' });
}

const task_api_get = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: 'Unauthorized' });
      } else {
        try {
          const tasks = await Task.find({ userId: decodedToken.id });
          const events = tasks
            .filter(task => task.dueDate) // Only map tasks with dates
            .map(task => ({
              title: task.title,
              start: task.dueDate.toISOString().split('T')[0],
              url: `/tasks/${task._id}`,
              color: task.completed ? '#28a745' : '#3788d8'
            }));
          res.json(events);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Server Error' });
        }
      }
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = {
  task_index,
  task_details,
  task_create_get,
  task_create_post,
  task_delete,
  task_calendar_get,
  task_api_get
}