/***********REQUIRING EXPRESS(page 27)********* 
const express = require('express') 
// require express module
const app = express() 
// calls express function to start new Express app
app.listen(3000,()=>{
console.log("App listening on port 3000")
})
*/


/***********HANDLING REQUESTS WITH EXPRESS(page 30)********* */
// const express = require('express');
// const path = require('path');
// const app = express();

// app.use(express.static('public'));
// app.listen(3000, () => {
//     console.log("App listening on port 3000");
// })
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'index.html'));
// })
// app.get('/about', (req, res) => { // called when request to /about comes in
//     res.sendFile(path.resolve(__dirname, 'about.html'));
// })
// app.get('/contact', (req, res) => { //called when request to /contact comes
//     res.sendFile(path.resolve(__dirname, 'contact.html'));
// })



// const server = http.createServer((req, res) => {
//     if (req.url === '/about')
//         res.end(aboutPage)
//     else if (req.url === '/contact')
//         res.end(contactPage)
//     else if (req.url === '/')
//         res.end(homePage)
//     else {
//         res.writeHead(404)
//         res.end(notFoundPage)
//     }
// })

const express = require('express');
const app = express()
app.listen(3000, () => {
    console.log("App listening on port 3000")
})
app.get('/', (req, res) => {
    res.json({
        name: 'Greg Lim'
    })
})