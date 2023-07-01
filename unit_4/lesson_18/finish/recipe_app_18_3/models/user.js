"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  //creating the user schema
  userSchema = new Schema(
    {
      name: {
        first: {
          type: String,
          trim: true
        },
        last: {
          type: String,
          trim: true
        }
      },
      //adding name properties
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
      zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
      },
      password: {
        type: String,
        required: true
      },
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
      subscribedAccount: {
        type: Schema.Types.ObjectId,
        ref: "Subscriber"
        //Add a subscribedAccount to connect users to subscribers.
      }
    },
    //adding validations to properties for better quality data
    {
      timestamps: true
    }
    //Add a timestamps property to record createdAt and updatedAt dates.
  );

userSchema.virtual/*virtual attribute*/("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
  //fullname method returns both name and surname
});
module.exports = mongoose.model("User", userSchema);
//export the userSchema using keyword User
