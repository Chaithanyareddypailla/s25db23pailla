var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;

var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');
router.get('/', function (req, res) {
  res.render('index', { title: 'Chimes App', user: req.user });
});
router.get('/register', function (req, res) {
  res.render('register', { title: 'Chimes App Registration' });
});
router.post('/register', function (req, res) {
  Account.findOne({ username: req.body.username })
    .then(function (user) {
      if (user != null) {
        console.log("exists " + req.body.username)
        return res.render('register', {
          title: 'Registration',
          message: 'Existing User', account: req.body.username
        })
      }
      let newAccount = new Account({ username: req.body.username });
      Account.register(newAccount, req.body.password, function (err, user) {
        if (err) {
          console.log("db creation issue " + err)
          return res.render('register', {
            title: 'Registration',
            message: 'access error', account: req.body.username
          })
        }
        if (!user) {
          return res.render('register', {
            title: 'Registration',
            message: 'access error', account: req.body.username
          })
        }
      })
      console.log('Sucess, redirect');
      res.redirect('/');
    })
    .catch(function (err) {
      return res.render('register', {
        title: 'Registration',
        message: 'Registration error', account: req.body.username
      })
    })
});

router.get('/login', function (req, res) {
  res.render('login', { title: 'Chimes App Login', user: req.user });
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/');
});
router.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/');
});
router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
router.get('/ping', function (req, res) {
  res.status(200).send("pong!");
});
module.exports = router;
router.get('/ping', function (req, res) {
  res.status(200).send("pong!");
});
module.exports = router
