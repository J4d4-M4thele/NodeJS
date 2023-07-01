"use strict";

//require user model
const User = require("../models/user");

module.exports = {
  index: (req, res, next) => {
    User.find()
    //find method retrieves users
    //finds users according to model description
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
    //render index page in the users folder
  }
};
