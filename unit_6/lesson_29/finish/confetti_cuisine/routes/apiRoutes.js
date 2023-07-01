"use strict";

//Require the Express.js Router and coursesController
const router = require("express").Router(),
  coursesController = require("../controllers/coursesController");

router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON
  //Create a route for the courses data endpoint
);
//Create a route to join a course by ID.
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
//Handle all API errors.
router.use(coursesController.errorJSON);

module.exports = router;
