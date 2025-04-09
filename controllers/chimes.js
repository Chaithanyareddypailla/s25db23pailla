var Chimes = require('../models/chimes');

// List of all chime
exports.chimes_list = async function(req, res) {
    try{
    theChimes = await Chimes.find();
    res.send(theChimes);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    } 
   }
// VIEWS
// Handle a show all view
exports.costume_view_all_Page = async function(req, res) {
    try{
    theCostumes = await Costume.find();
    res.render('costumes', { title: 'Costume Search Results', results: theCostumes });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    } 
   };
// for a specific chimes.
exports.chimes_detail = function(req, res) {
 res.send('NOT IMPLEMENTED: chimes detail: ' + req.params.id);
};
// Handle chimes create on POST.
exports.chimes_create_post = function(req, res) {
 res.send('NOT IMPLEMENTED: chimes create POST');
};
// Handle chimes delete from on DELETE.
exports.chimes_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: chimes delete DELETE ' + req.params.id);
};
// Handle chimes update form on PUT.
exports.chimes_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: chimes update PUT' + req.params.id);
};
