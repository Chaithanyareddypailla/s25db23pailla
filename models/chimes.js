const mongoose = require("mongoose");

const chimesSchema = mongoose.Schema({
  chime_type: String,
  material: String,  // <-- Add material field here to match your Pug
  size: String,
  cost: Number
});

module.exports = mongoose.model("Chimes", chimesSchema);
