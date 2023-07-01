"use strict";

const httpStatus = require("http-status-codes"),
  contentTypes = require("./contentTypes"),
  utils = require("./utils");

const routes = {
  GET: {},
  POST: {}
};

exports.handle = (req, res) => {
  try {
        //display page that is entered into url
    routes[req.method][req.url](req, res);
  } catch (e) {
     //catch error which will display the error page
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/error.html", res);
  }
};

exports.get = (url, action) => {
  routes["GET"][url] = action;
};

exports.post = (url, action) => {
  routes["POST"][url] = action;
};
//preparation for all get and post requests
