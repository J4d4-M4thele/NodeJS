"use strict";

//Require the subscriber module.
const Subscriber = require("../models/subscriber");
//route /subscribe calls this
//Export getAllSubscribers to pass data from the database to the next middleware function.
exports.getAllSubscribers = (req, res) => {
  //Query with find on the Subscriber
  Subscriber.find({})
  //Set data that comes back from MongoDB on request object
    .exec()
    //promises then functions
    .then(subscribers => {
      res.render("subscribers", {
        subscribers: subscribers
      });
    })
    .catch(error => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};

exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
  //render contact.ejs
};

exports.saveSubscriber = (req, res) => {
  //maps form data to model 
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode
  });
  //new subscriber created by mongoDB
  newSubscriber
   //Save a new subscriber with a promise return.
    .save()
    .then(result => {
      res.render("thanks");
      //thanks.ejs called
    })
    .catch(error => {
      if (error) res.send(error);
    });
};
