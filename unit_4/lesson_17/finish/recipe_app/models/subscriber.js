"use strict";

const mongoose = require("mongoose");
//creating a schema using mongoose
const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"],
    //gives custom message for codes outside min value
    max: 99999
  },
  //validations added for better quality data entry
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

//adding instance methods to return subscriber's fullname 
subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

//find subscribers using specific zipcode (in one area)
subscriberSchema.methods.findLocalSubscribers = function() {
  return this.model("Subscriber")
    .find({ zipCode: this.zipCode })
    .exec();
};
//make model public(under variable of subscriber)
module.exports = mongoose.model("Subscriber", subscriberSchema);
