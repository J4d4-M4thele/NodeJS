"use strict";

//import mongoose
const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
  });
  //schema specifying data types

module.exports = mongoose.model("Subscriber", subscriberSchema);
//makes subscriber schema public
