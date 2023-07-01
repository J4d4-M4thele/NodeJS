"use strict";

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts"),
  //Require the MongoDB module.
  MongoDB = require("mongodb").MongoClient,
  dbURL = "mongodb://localhost:27017",
  //connect with url
  dbName = "recipe_db";
  //database that'll be used

  //making connection to database (local server)
MongoDB.connect(
  dbURL,
  (error, client) => {
    if (error) throw error;
    //get recipe database from server connection
    let db = client.db(dbName);
    //finding all records in contacts collection
    db.collection("contacts")
      .find()
      //finding all records
      .toArray((error, data) => {
        if (error) throw error;
        console.log(data);
        //all contacts go into variable data
        //printed to the REPL environment 
      });
     //inserting data into database
    db.collection("contacts").insert(
      {
        name: "Freddie Mercury",
        email: "fred@queen.com"
      },
      (error, db) => {
        if (error) throw error;
        //log resulting errors/ save
        console.log(db);
      }
    );
  }
);

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
