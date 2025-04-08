// 🛠️ FIRST: Core Setup
require('dotenv').config();                     // 1. Load environment variables
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 🛠️ SECOND: Import Mongoose and Model
const mongoose = require('mongoose');           // 2. Import mongoose
var Costume = require('./models/costume');      // 3. Import Costume model

// 🛠️ THIRD: Initialize Express App
var app = express();

// 🛠️ FOURTH: Connect to MongoDB
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Get the default connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connection to DB succeeded');
});

// 🛠️ FIFTH: SEEDING FUNCTION
async function recreateDB() {
  await Costume.deleteMany();  // Delete all existing costumes

  // Create new costumes
  const costumes = [
      { costume_type: "Ghost", size: "Large", cost: 15.4 },
      { costume_type: "Vampire", size: "Medium", cost: 25.0 },
      { costume_type: "Witch", size: "Small", cost: 18.0 }
  ];

  await Costume.insertMany(costumes);   // Insert costumes
  console.log('Database seeded with costumes');
}

// Reseed if needed
const reseed = true;
if (reseed) { recreateDB(); }

// 🛠️ SIXTH: View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 🛠️ SEVENTH: Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 🛠️ EIGHTH: Routers
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

// 🛠️ NINTH: Error Handling
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// 🛠️ TENTH: Export app
module.exports = app;
