const mongoose = require("mongoose");

const chimesSchema = mongoose.Schema({
  chime_type: String,
  size: String,
  cost: Number
});

module.exports = mongoose.model("Chimes", chimesSchema);
