"use strict";
// Import modules for use in getFile
const fs = require("fs"),
  httpStatus = require("http-status-codes"),
  contentTypes = require("./contentTypes");
// Export a function to read files and return a response.
module.exports = {
  getFile: (file, res) => {
    fs.readFile('./${file}', (error, data) => {
      if (error) {
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);
        res.end("There was an error serving content!");
      }
      res.end(data);
    });
  }
};