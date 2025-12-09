require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

//const Task = require('./models/task');
const mainRoutes = require('./routes/mainRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const userMiddleware = require('./middleware/authMiddleware');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

/* middleware */
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Make version available to all views
app.use((req, res, next) => {
  res.locals.version = process.env.npm_package_version || '1.0.0';
  next();
});

// view engine  
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/* MongoDB and mongoose */
const dbURI = process.env.MONGODB_URI;
const port = process.env.PORT || 800;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Only run app.listen if executed directly (e.g. locally)
if (require.main === module) {
  app.listen(port, () => {
    console.log('listing on port:', port);
  });
}

module.exports = app;


/* Routes */
app.get('/', (req, res) => {
  res.redirect('/coursePage');
});
app.use(mainRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use('/tasks', taskRoutes);
// this is latest edit to check..

