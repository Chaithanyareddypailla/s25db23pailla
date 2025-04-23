var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var chimes_controller = require('../controllers/chimes');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// Chimes ROUTES ///
// POST request for creating a chimes. 
router.post('/chimes', chimes_controller.chimes_create_post);
// DELETE request to delete chimes.
router.delete('/chimes/:id', chimes_controller.chimes_delete);
// PUT request to update chimes.
router.put('/chimes/:id', chimes_controller.chimes_update_put);
// GET request for one chimes.
router.get('/chimes/:id', chimes_controller.chimes_detail);
// GET request for list of all chimesitems.
router.get('/chimes', chimes_controller.chimes_list);
router.get('/login', function(req, res) {
    res.render('login', { title: 'Chimes App Login', user : req.user });
   });
   router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
   });
   router.get('/logout', function(req, res) {
    req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
    });
   });
   router.get('/ping', function(req, res){
    res.status(200).send("pong!");
   });
   module.exports = router;
   router.get('/ping', function(req, res){
    res.status(200).send("pong!");
   });
   module.exports = router;
module.exports = router;