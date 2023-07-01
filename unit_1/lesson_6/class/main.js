const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    fs = require("fs");
const routeMap = {
    //where there's a slash present the HTML index page 
    "/": "views/index.html"
};
http
    .createServer((req, res) => {
        res.writeHead(httpStatus.OK, {
            "Content-Type": "text/html"
        });
        if (routeMap[req.url]) {
            //read the file in the routeMap
            fs.readFile(routeMap[req.url], (error, data) => {
                res.write(data);
                //send response back
                res.end();
            });
        } else {
            //if unfamiliar route is typed into URL 
            res.end("<h1>Sorry, not found.</h1>");
        }
    })
    .listen(port);
console.log(`The server has started and is listening
➥ on port number: ${port}`);