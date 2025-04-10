var Chimes = require('../models/chimes');

// List of all chime
exports.chimes_list = async function (req, res) {
    try {
        theChimes = await Chimes.find();
        res.send(theChimes);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
}
// for a specific chimes.
exports.chimes_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: chimes detail: ' + req.params.id);
};
// Handle chimes create on POST.
//exports.chimes_create_post = function (req, res) {
    //res.send('NOT IMPLEMENTED: chimes create POST');
//};

// Handle Costume create on POST.
exports.chimes_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Chimes();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.chimes_type = req.body.chimes_type;
    document.cost = req.body.cost;
    document.size = req.body.size;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    } 
   };
// for a specific Costume.
exports.chimes_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await chimes.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
}
// Handle chimes delete from on DELETE.
exports.chimes_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: chimes delete DELETE ' + req.params.id);
};
// Handle chimes update form on PUT.
exports.chimes_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: chimes update PUT' + req.params.id);
};

// VIEWS
// Handle a show all view
exports.chimes_view_all_Page = async function(req, res) {
    try{
    theChimes = await Chimes.find();
    res.render('chimes', { title: 'Costume Search Results', results: theChimes });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    } 
   };
   