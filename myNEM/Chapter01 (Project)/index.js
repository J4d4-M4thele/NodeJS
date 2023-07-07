/*********CREATING A SERVER(page 13)******************
//import http module(there by default, don't need to install http)
const http = require('http');
//creating server
const server = http.createServer((req, res) => {
    console.log(req.url);
    res.end('Hello Node.js');
});
//server listens on localhost:3000
server.listen(3000);
console.log("server is listening on port 3000");
*/



/***********RESPONDING WITH TEXT FOR PAGES(page 15)******* 
//import http module(there by default, don't need to install http)
const http = require('http');
//creating server
const server = http.createServer((req, res) => {
    if (req.url === '/about')
        res.end('The about page')
    else if (req.url === '/contact')
        res.end('The contact page')
    else if (req.url === '/')
        res.end('The home page')
    else {
        res.writeHead(404)
        res.end('page not found')
    }
})    
//server listens on localhost:3000
server.listen(3000);
console.log("server is listening on port 3000");
*/


/************RESPONDING WITH HTML(page 18)******** */
const http = require('http')
const fs = require('fs')
//readfilesystem method allows pages to be stored as variabes
const homePage = fs.readFileSync('index.html')
const aboutPage = fs.readFileSync('about.html')
const contactPage = fs.readFileSync('contact.html')
const notFoundPage = fs.readFileSync('notfound.html')
const server = http.createServer((req, res) => {
    if (req.url === '/about')
        res.end(aboutPage)
    else if (req.url === '/contact')
        res.end(contactPage)
    else if (req.url === '/')
        res.end(homePage)
    else {
        res.writeHead(404)
        res.end(notFoundPage)
    }
})
server.listen(3000)
