const express = require('express')
const mongoose = require('mongoose')//page 53 - Connecting to MongoDB from Node
const flash = require('connect-flash');

mongoose.connect('mongodb://127.0.0.1/my_database', { useNewUrlParser: true })

const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')//tell Express to use EJS 

const fileUpload = require('express-fileupload')
const validateMiddleware = require('./middleware/validateMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

const expressSession = require('express-session')
app.use(expressSession({
    secret: 'keyboard cat'
}))

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

app.use(express.static('public'))
app.use(fileUpload())

//app.use(customMiddleware)
app.use(express.json()) //body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use('/posts/store', validateMiddleware) //to use validation middleware only to create posts
//connecting to flash
app.use(flash());

//declare logged in
global.loggedIn = null;
//* wildcard for all requests
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

//home page
app.get('/', homeController)

//handles application login and logout
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController)

//handles posts
app.get('/posts/new', authMiddleware, newPostController)
app.get('/post/:id', getPostController)
app.post('/posts/store', authMiddleware, storePostController)

//handles users
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.use((req, res) => res.render('notfound'));

app.listen(4000, () => {
    console.log('App listening on port 4000')
})