const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

//const Task = require('./models/task');
const mainRoutes = require('./routes/mainRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();


/* middleware */
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// view engine  
app.set('view engine', 'ejs');


/* MongoDB and mongoose */
const dbURI = 'mongodb+srv://stige:stige@stige-week7-mogodb-basi.cttbz.mongodb.net/Dronacharyian?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    //console.log("result: of DBURI:- ", result);
    app.listen(process.env.PORT || 800);
  })
  .catch(err => console.log(err));


/* Routes */
app.get('/', (req, res) => {
  res.redirect('./homepage');
});
app.use(mainRoutes);
app.use(authRoutes);


//app.use(taskRoutes);
// app.use('/tasks', taskRoutes);
