const express = require('express')
const expressSession = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose')//page 53 - Connecting to MongoDB from Node

mongoose.connect('mongodb://127.0.0.1/my_database', { useNewUrlParser: true })

const app = new express()
const ejs = require('ejs')
app.set('view engine', 'ejs')//tell Express to use EJS 

const fileUpload = require('express-fileupload')
const validateMiddleware = require('./middleware/validateMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

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

app.use(expressSession({
    secret: 'keyboard cat', //used by express-session package to sign and encrypt session ID cookie
    resave: false,
    saveUninitialized: true
}));

app.use(fileUpload())
//app.use(customMiddleware)
app.use(express.json()) //body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use('/posts/store', validateMiddleware) //to use validation middleware only to create posts
app.use(flash());

global.loggedIn = null; //global variable logged in with be accessible in all EJS files

app.use("*", (req, res, next) => {//wildcard: on all requests, this middleware should be executed
    loggedIn = req.session.userId;
    next()
});


app.get('/', homeController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController)
app.get('/posts/new', authMiddleware, newPostController) //unauthenticated user cannot create post
app.get('/post/:id', getPostController)

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.post('/posts/store', authMiddleware, storePostController) //call authMiddleware before store post

app.use((req, res) => res.render('notfound'));

app.listen(4000, () => {
    console.log('App listening on port 4000')
})