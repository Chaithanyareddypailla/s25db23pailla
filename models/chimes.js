const mongoose = require("mongoose");

const chimesSchema = mongoose.Schema({
  chime_type: String,
  material: String,  // <-- Add material field here to match your Pug
  cost: Number
});

module.exports = mongoose.model("test.c screen shot 5 of response for /resource.himes", chimesSchema);




