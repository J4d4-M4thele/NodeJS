"use strict";

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts"),
  //requiring database model dependency (Mongoose)
  mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");
  //requires subscriber.js

  //setup connection to database
mongoose.connect(
  "mongodb://127.0.0.1:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
//assign connection to db variable
const db = mongoose.connection;
//log message when database is connected to database
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});


//call findOne method to find records in our database
var myQuery = Subscriber.findOne({
  name: "Jon Wexler"
}).where("email", /wexler/);
//query with callback function to handle errors
myQuery.exec((error, data) => {
  if (data) console.log(data.name);
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

//routes
app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
