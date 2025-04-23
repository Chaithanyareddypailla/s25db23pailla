const mongoose = require("mongoose");

const chimesSchema = mongoose.Schema({
  chimes_name: {
    type: String,
    required: [true, 'Chime name is required'],
    minlength: [3, 'Chime name must be at least 3 characters long'],
    maxlength: [50, 'Chime name must be at most 50 characters long']
  },
  material: {
    type: String,
    required: [true, 'Material is required'],
    minlength: [3, 'Material must be at least 3 characters long']
  },
  cost: {
    type: Number,
    required: [true, 'Cost is required'],
    min: [10, 'Cost must be at least $10'],
    max: [1000, 'Cost must not exceed $1000']
  }
});

module.exports = mongoose.model("Chimes", chimesSchema)




