"use strict";

const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
  });
  //specifies data types

module.exports = mongoose.model("Subscriber", subscriberSchema);
