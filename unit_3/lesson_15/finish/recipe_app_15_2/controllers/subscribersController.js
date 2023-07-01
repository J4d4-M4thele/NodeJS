"use strict";
//Require the subscriber module.
const Subscriber = require("../models/subscriber");

//Export getAllSubscribers to pass data from the database to the next middleware function.
exports.getAllSubscribers = (req, res, next) => {
  //Query with find on the Subscriber
  Subscriber.find({}, (error, subscribers) => {
    //Set data that comes back from MongoDB on request object
    if (error) next(error);
    req.data = subscribers;
    //next function handles errors (middleware function)
    next();
  });
};

exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode
  });
  newSubscriber.save((error, result) => {
    if (error) res.send(error);
    res.render("thanks");
  });
};
