// 🛠️ Add these new lines to connect MongoDB
require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose'); // Load Mongoose library

// Connect to MongoDB Atlas

const connectionString = process.env.MONGO_CON; 
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;

// Error handler
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Success handler
db.once('open', function() {
  console.log('Connection to DB succeeded');
});
// SEEDING FUNCTION
async function recreateDB() {
  await Costume.deleteMany();  // Delete all existing costumes

  // Create new costumes
  const costumes = [
      { costume_type: "Ghost", size: "Large", cost: 15.4 },
      { costume_type: "Vampire", size: "Medium", cost: 25.0 },
      { costume_type: "Witch", size: "Small", cost: 18.0 }
  ];

  // Insert costumes
  await Costume.insertMany(costumes);
  console.log('Database seeded with costumes');
}

// Only reseed if needed
const reseed = true;
if (reseed) { recreateDB(); }

// 🛠️ Create Express App
var app = express();   // <<< YOU NEED THIS BEFORE using app.use()

// MongoDB connect code comes here...

// 🛠️ Then safely use middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers will be added later here (in next parts of the assignment)

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

module.exports = app;


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chimesRouter = require('./routes/chimes');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var Costume = require("./models/costume");zz

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chimes', chimesRouter);
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
