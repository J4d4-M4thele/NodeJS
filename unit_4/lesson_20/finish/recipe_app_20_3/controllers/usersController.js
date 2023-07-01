"use strict";

const User = require("../models/user");

module.exports = {
  index: (req, res, next) => {
    User.find()
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
  },
  new: (req, res) => {
    res.render("users/new");
  },
  //C in CRUD (Create)
  create: (req, res, next) => {
    let userParams = {
      name: {
        first: req.body.first,
        last: req.body.last
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode
    };
    User.create(userParams)
      .then(user => {
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        next(error);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  //R in CRUD (Read)
  //links to show.ejs
  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("users/show");
  },
  //U in CRUD(Update)
  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
    //find user by ID
      .then(user => {
        res.render("users/edit", {
          user: user
          //allows us to edit user's record
        });
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  //U in CRUD(Update)
  update: (req, res, next) => {
    let userId = req.params.id,
      userParams = {
        name: {
          first: req.body.first,
          last: req.body.last
        },
        email: req.body.email,
        password: req.body.password,
        zipCode: req.body.zipCode
      };
      //Collect user parameters from request.
    User.findByIdAndUpdate(userId, {
      $set: userParams
      //locates user by ID
    })
      .then(user => {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
        //add user to response as local variable
      })
      .catch(error => {
        console.log(`Error updating user by ID: ${error.message}`);
        next(error);
      });
  },
  //D in CRUD (Delete) 
  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
    //removing record using method to identify user by ID
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch(error => {
        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  }
};
