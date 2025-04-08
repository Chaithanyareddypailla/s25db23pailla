var Chimes = require("./controllers/chimes");
// List of all Costumes
exports.chimes_list = function(req, res) {
 res.send('NOT IMPLEMENTED: chimes list');
};
// for a specific Costume.
exports.chimes_detail = function(req, res) {
 res.send('NOT IMPLEMENTED: chimes detail: ' + req.params.id);
};
// Handle Costume create on POST.
exports.chimes_create_post = function(req, res) {
 res.send('NOT IMPLEMENTED: chimes create POST');
};
// Handle Costume delete from on DELETE.
exports.chimes_delete = function(req, res) {
 res.send('NOT IMPLEMENTED:chimes delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.chimes_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: chimes update PUT' + req.params.id);
};
