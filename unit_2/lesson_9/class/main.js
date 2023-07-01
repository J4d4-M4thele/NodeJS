"use strict";

const port = 3000,
  express = require("express"),
  app = express();

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});
//if items/veg is in URL the response will show
app.get("/items/:vegetable", (req, res) => {
  let veg = req.params.vegetable;
  //res.send(`This is the page for ${veg}`);
  //put if or switch for 2 veggies to test
  if ("/items/:butternut") {
    res.send(`You know why I hate ${veg} squash? I always get the butt.`);
  }else if ("/items/:pickle") {
    res.send(`I watched a documentary last night about how ${veg} are made. It was jarring.`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
