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
// exports.chimes_detail = function (req, res) {
//     res.send('NOT IMPLEMENTED: chimes detail: ' + req.params.id);
// };
// for a specific Chimes.
exports.chimes_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Chimes.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
}
// Handle chimes create on POST.
//exports.chimes_create_post = function (req, res) {
//res.send('NOT IMPLEMENTED: chimes create POST');
//};

// Handle Costume create on POST.
exports.chimes_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Chimes();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.chimes_name = req.body.chimes_name;
    document.material = req.body.material;
    document.cost = req.body.cost;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle chimes delete from on DELETE.
//exports.chimes_delete = function (req, res) {
   // res.send('NOT IMPLEMENTED: chimes delete DELETE ' + req.params.id);
//};

// Handle Chimes delete on DELETE.
exports.chimes_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await Chimes.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
   };
   

// Handle Chimes update form on PUT.
exports.chimes_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body 
   ${JSON.stringify(req.body)}`)
    try {
    let toUpdate = await Chimes.findById( req.params.id)
    // Do updates of properties
    if(req.body.chimes_name) 
    toUpdate.chimes_name = req.body.chimes_name;
    if(req.body.material) toUpdate.material = req.body.material;
    if(req.body.cost) toUpdate.cost = req.body.cost;
    
   let result = await toUpdate.save();
    console.log("Sucess " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": ${err}: Update for id ${req.params.id} 
   failed`);
    }
   };

// VIEWS
// Handle a show all view
exports.chimes_view_all_Page = async function (req, res) {
    try {
        theChimes = await Chimes.find();
        res.render('chimes', { title: 'Chimes Search Results', results: theChimes });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }

};

// Handle a show one view with id specified by query
exports.chimes_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await Chimes.findById( req.query.id)
    res.render('chimesdetail', 
   { title: 'Chimes Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.chimes_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('chimescreate', { title: 'Chimes Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   // Handle building the view for updating a costume.
// query provides the id
exports.chimes_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await Chimes.findById(req.query.id)
    res.render('chimesupdate', { title: 'Chimes Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   // Handle a delete one view with id from query
exports.chimes_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await Chimes.findById(req.query.id)
    res.render('chimesdelete', { title: 'Chimes Delete', toShow: 
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };




