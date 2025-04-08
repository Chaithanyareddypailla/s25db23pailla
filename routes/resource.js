var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var chimes_controller = require('../controllers/chimes');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a chimes. 
router.post('/chimes', chimes_controller.chimes_chimes_post);
// DELETE request to delete chimes.
router.delete('/chimes/:id', chimes_controller.chimes_delete);
// PUT request to update chimes.
router.put('/chimes/:id', chimes_controller.chimes_update_put);
// GET request for one chimes.
router.get('/chimes/:id', chimes_controller.chimes_detail);
// GET request for list of all chimesitems.
router.get('/chimes', chimes_controller.chimes_list);
module.exports = router;