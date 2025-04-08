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
var Costume = require("./models/costume");

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
db.once('open', function() {
  console.log('Connection to DB succeeded');
});

// 🛠️ 7. Seeding Function
async function recreateDB() {
  await Costume.deleteMany();  // Delete all old costumes

  const costumes = [
    { costume_type: "Ghost", size: "Large", cost: 15.4 },
    { costume_type: "Vampire", size: "Medium", cost: 25.0 },
    { costume_type: "Witch", size: "Small", cost: 18.0 }
  ];

  await Costume.insertMany(costumes);
  console.log('Database seeded with costumes');
}

const reseed = true;
if (reseed) { recreateDB(); }

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
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// 🛠️ 12. Export App
module.exports = app;
