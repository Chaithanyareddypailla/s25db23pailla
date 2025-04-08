// 🛠️ 1. Load Environment Variables
require('dotenv').config();

// 🛠️ 2. Core Modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 🛠️ 3. MongoDB Setup
const mongoose = require('mongoose');
var Chimes = require("./models/chimes");


// 🛠️ 4. Create Express App
var app = express();   // <<< Now it's safe to use app

// 🛠️ 5. Connect to MongoDB Atlas
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 🛠️ 6. Handle MongoDB Connection Events
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('Connection to DB succeeded');
});

// We can seed the collection if needed on server start


// 🛠️ 8. Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 🛠️ 9. View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 🛠️ 10. Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chimesRouter = require('./routes/chimes');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chimes', chimesRouter);
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);

// 🛠️ 11. Error Handling
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// 🛠️ 12. Export App
module.exports = app;
// We can seed the collection if needed on  server start
async function recreateDB() {
  // Delete everything
  await Chimes.deleteMany();
  let instance1 = new
    Chimes({
      Chimes_type: "Wind Chimet", material: 'Bamboo',
      cost: 15
    });
  instance1.save().then(doc => {
    console.log("First object saved")
  }
  ).catch(err => {
    console.error(err)
  });
  let instance2 = new
    Chimes({
      Chimes_type: "Temple Bell", size: 'Brass',
      cost: 30
    });
  instance2.save().then(doc => {
    console.log("Second object saved")
  }
  ).catch(err => {
    console.error(err)
  });
  let instance3 = new
    Chimes({
      Chimes_type: "Zen Chime", size: 'Crystal',
      cost: 25
    });
  instance3.save().then(doc => {
    console.log("Third object saved")
  }
  ).catch(err => {
    console.error(err)
  });
}
let reseed = true;
if (reseed) { recreateDB(); }