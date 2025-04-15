const mongoose = require("mongoose");

const chimesSchema = mongoose.Schema({
  chimes_name: String,
  material: String,  // <-- Add material field here to match your Pug
  cost: Number
});

module.exports = mongoose.model("Chimes", chimesSchema)




