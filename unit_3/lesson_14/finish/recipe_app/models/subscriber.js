"use strict";

const mongoose = require("mongoose"),
//other person requires exported module(making it public)
  subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
  });

module.exports = mongoose.model("Subscriber", subscriberSchema);
//schema created for subscribers