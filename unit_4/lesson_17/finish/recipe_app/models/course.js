"use strict";
//required mongoose
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  items: [],
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"],
    //error message displays if zipcode is less than 10000
    max: 99999
  }
});
//properties and validations added for better quality data 

module.exports = mongoose.model("Course", courseSchema);
