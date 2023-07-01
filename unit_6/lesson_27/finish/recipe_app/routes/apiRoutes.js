"use strict";

const router = require("express").Router(),
//Require courses controller.
  coursesController = require("../controllers/coursesController");


//only courses are subjected to api
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON
);
router.use(coursesController.errorJSON);

module.exports = router;
