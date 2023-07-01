"use strict";

//Require the Express.js Router.
const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  //Require all the route modules within the same directory.
  subscriberRoutes = require("./subscriberRoutes"),
  courseRoutes = require("./courseRoutes"),
  errorRoutes = require("./errorRoutes"),
  homeRoutes = require("./homeRoutes");


//Use the routes from the relative route modules with namespaces
router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
