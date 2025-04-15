var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('chimes', { title: 'Search Results: Chimes' });
});

module.exports = router;


var express = require('express');
const chimes_controlers = require('../controllers/chimes');

var router = express.Router();
/* GET chimes */
router.get('/', chimes_controlers.chimes_view_all_Page);
/* GET detail chimes page */
router.get('/detail', chimes_controlers.chimes_view_one_Page);
/* GET create chimes page */
router.get('/create', chimes_controlers.chimes_create_Page);
/* GET create update page */
router.get('/update', chimes_controlers.chimes_update_Page);
/* GET delete costume page */
router.get('/delete', chimes_controlers.chimes_delete_Page);

module.exports = router;

