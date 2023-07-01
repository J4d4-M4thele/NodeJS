"use strict";

//require mongoose(import mongoose module)
const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  Subscriber = require("./subscriber");

var userSchema = new Schema(
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
    subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" },
    //associates users with subscribers
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }]
  },
  //allows for many courses to be chosen by one user
  {
    timestamps: true
  }
);

//Add the fullName virtual attribute.
userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});

//hook method pre (links to subscriber)
userSchema.pre("save", function(next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
      email: user.email
      //check if user is linked to subscriber account
    })
      .then(subscriber => {
        user.subscribedAccount = subscriber;
        next();
      })
      //Search the Subscriber model for documents that contain that user’s email.
      .catch(error => {
        console.log(`Error in connecting subscriber: ${error.message}`);
        next(error);
        //call the next middleware function
      });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
