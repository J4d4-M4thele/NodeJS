"use strict";

const Course = require("../models/course"),
  httpStatus = require("http-status-codes"),
  User = require("../models/user");

module.exports = {
  index: (req, res, next) => {
    Course.find({})
      .then(courses => {
        res.locals.courses = courses;
        next();
      })
      .catch(error => {
        console.log(`Error fetching courses: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("courses/index");
  },
  new: (req, res) => {
    res.render("courses/new");
  },

  create: (req, res, next) => {
    let courseParams = {
      title: req.body.title,
      description: req.body.description,
      items: [req.body.items.split(",")],
      zipCode: req.body.zipCode
    };
    Course.create(courseParams)
      .then(course => {
        res.locals.redirect = "/courses";
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error saving course: ${error.message}`);
        next(error);
      });
  },

  show: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then(course => {
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("courses/show");
  },

  edit: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then(course => {
        res.render("courses/edit", {
          course: course
        });
      })
      .catch(error => {
        console.log(`Error fetching course by ID: ${error.message}`);
        next(error);
      });
  },

  update: (req, res, next) => {
    let courseId = req.params.id,
      courseParams = {
        title: req.body.title,
        description: req.body.description,
        items: [req.body.items.split(",")],
        zipCode: req.body.zipCode
      };

    Course.findByIdAndUpdate(courseId, {
      $set: courseParams
    })
      .then(course => {
        res.locals.redirect = `/courses/${courseId}`;
        res.locals.course = course;
        next();
      })
      .catch(error => {
        console.log(`Error updating course by ID: ${error.message}`);
        next(error);
      });
  },

  delete: (req, res, next) => {
    let courseId = req.params.id;
    Course.findByIdAndRemove(courseId)
      .then(() => {
        res.locals.redirect = "/courses";
        next();
      })
      .catch(error => {
        console.log(`Error deleting course by ID: ${error.message}`);
        next();
      });
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
  //Handle the request from previous middleware, and submit response.
  respondJSON: (req, res) => {
    res.json({
      status: httpStatus.OK,
      //respond with local data (courses object)
      data: res.locals
    });
  },
  //Respond with a 500 status code and error message in JSON format.
  errorJSON: (error, req, res, next) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message
      };
    } else {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Unknown Error."
      };
    }
    res.json(errorObject);
  },
  //Add the join action to let users join a course.
  join: (req, res, next) => {
    //Get the course id and current user from the request.
    let courseId = req.params.id,
      currentUser = req.user;
      //Check whether a current user is logged in.
    if (currentUser) {
      User.findByIdAndUpdate(currentUser, {
        $addToSet: {
          //Update the user’s courses field to contain the targeted course.
          courses: courseId
        }
      })
        .then(() => {
          //Respond with a JSON object with a success indicator.
          res.locals.success = true;
          next();
        })
        //Respond with a JSON object with an error indicator.
        .catch(error => {
          next(error);
        });
    } else {
      //Pass an error through to the next middleware function.
      next(new Error("User must log in."));
    }
  },
  filterUserCourses: (req, res, next) => {
    let currentUser = res.locals.currentUser;
    //Check whether a user is logged in.
    if (currentUser) {
      let mappedCourses = res.locals.courses.map(course => {
        //Modify course data to add a flag indicating user association.
        let userJoined = currentUser.courses.some(userCourse => {
          //Check whether the course exists in the user’s courses array.
          return userCourse.equals(course._id);
        });
        return Object.assign(course.toObject(), { joined: userJoined });
      });
      res.locals.courses = mappedCourses;
      next();
    } else {
      next();
    }
  }
};
