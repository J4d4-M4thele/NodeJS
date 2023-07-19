const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')

const app = new express()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(fileUpload());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const validateMiddleware = require("./middleware/validationMiddleware")
app.use('/posts/store', validateMiddleware)


const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

mongoose.connect('mongodb://127.0.0.1/my_database',{ useNewUrlParser: true })

//renders home page
app.get('/',homeController)

//handles posts(creating, reading and storing)
app.get('/post/:id',getPostController)
app.post('/posts/store', storePostController)
app.get('/posts/new',newPostController)

//handles user registration
app.get('/auth/register', newUserController)
app.post('/users/register', storeUserController)

//handles user login
app.get('/auth/login', loginController)
app.post('/users/login',loginUserController)

//app ran on port 4000
app.listen(4000, () => {
    console.log('App listening on port 4000')
})

