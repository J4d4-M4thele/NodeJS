"use strict";

//require mongoose
const mongoose = require("mongoose"),
//schema has properties and validation rules for better quality data input
  { Schema } = mongoose;

var subscriberSchema = new Schema(
  {
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
      max: 99999
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course"
      }
    ]
    //associates multiple courses
  },
  {
    timestamps: true
  }
);


//getInfo instance method
subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

//export subscriber model
module.exports = mongoose.model("Subscriber", subscriberSchema);
