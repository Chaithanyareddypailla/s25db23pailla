var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('chimes', { title: 'Search Results: Chimes' });
});

module.exports = router;


var express = require('express');
const chimes_controlers= require('../controllers/chimes');
var router = express.Router();
/* GET chimes */
router.get('/', chimes_controlers.chimes_view_all_Page );
module.exports = router;


