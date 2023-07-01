"use strict";

//require mongoose and subscriber
const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");

mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.connection;

//contact object
var contacts = [
  {
    name: "Jon Wexler",
    email: "jon@jonwexler.com",
    zipCode: 10016
  },
  {
    name: "Chef Eggplant",
    email: "eggplant@recipeapp.com",
    zipCode: 20331
  },
  {
    name: "Professor Souffle",
    email: "souffle@recipeapp.com",
    zipCode: 19103
  }
];

Subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscriber data is empty!");
  });
//deleting all existing data

var commands = [];

//looping through subscriber objects to create promises
contacts.forEach(c => {
  commands.push(
    Subscriber.create({
      name: c.name,
      email: c.email
    })
  );
});

//log confirmation once promises resolve
Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    //presents each subscriber's information as a JSON string
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });
  //data loaded , can be done independantly
  //done before application starts
  //isn't part of main.js
