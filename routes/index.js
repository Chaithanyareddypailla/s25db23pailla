var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('chimes', { title: 'Search Results: Chimes' });
});

module.exports = router;

