const express = require('express')
const path = require('path');
const mongoose = require('mongoose')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')

const app = new express()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(fileUpload());

app.use(express.json())
app.use(express.urlencoded())

// That is, if Express sees a request from the given url ‘/posts/store’, 
//then execute the middleware validateMiddleWare. Note: make sure the above statement is after app.use(fileUpload()) since we depend on
// the req object having the files property. 
const validateMiddleWare = (req, res, next) => {
    if (req.files == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}
app.use('/posts/store',validateMiddleWare)


const BlogPost = require('./models/BlogPost.js')

mongoose.connect('mongodb://127.0.0.1/my_database',
    { useNewUrlParser: true })

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    });
})

app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})


app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})

app.post('/posts/store', (req, res) => {
    console.log(req.files)
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
        await BlogPost.create({
            title: req.body.title,
            body: req.body.body,
            username: req.body.username,
            image: '/img/' + image.name
        })
        res.redirect('/')
    })
})

app.listen(4000, () => {
    console.log('App listening on port 4000')
})

//pg 89