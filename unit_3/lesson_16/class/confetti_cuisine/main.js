"use strict";

//importing modules
const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController"),
  layouts = require("express-ejs-layouts");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://127.0.0.1:27017/confetti_cuisine",
  { useNewUrlParser: true }
  //connect to mongoose
);
mongoose.set("useCreateIndex", true);
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(layouts);
//static files from our public folder 
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
  //index.ejs
});

app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);
//subscriber info saved in database

app.get("/courses", homeController.showCourses);
app.post("/contact", homeController.postedSignUpForm);

//error handlers
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

//shows which port server is running on
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
