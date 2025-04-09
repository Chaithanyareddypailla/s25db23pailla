var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('chimes', { title: 'Search Results: Chimes' });
});

module.exports = router;



const express = require('express');
const router = express.Router();

// ✅ Add only this:
const chimes_controllers = require('../controllers/chimes_controllers');

router.get('/', chimes_controllers.chimes_view_all_Page);

module.exports = router;

