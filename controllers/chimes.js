var Costume = require('../models/chimes');
// List of all Costumes
exports.chime_list = function(req, res) {
 res.send('NOT IMPLEMENTED: chimes list');
};
// for a specific Costume.
exports.chime_detail = function(req, res) {
 res.send('NOT IMPLEMENTED: chimes detail: ' + req.params.id);
};
// Handle Costume create on POST.
exports.chime_create_post = function(req, res) {
 res.send('NOT IMPLEMENTED: chimes create POST');
};
// Handle Costume delete from on DELETE.
exports.chime_delete = function(req, res) {
 res.send('NOT IMPLEMENTED:chimes delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.chime_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: chimes update PUT' + req.params.id);
};
