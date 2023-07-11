const express = require('express');
const path = require('path');
const app = new express();
const ejs = require('ejs');
const BlogPost = require('./models/BlogPost.js');
//requiring mongoose, connecting to a database 
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/my_database',
    { useNewUrlParser: true })
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.listen(3000, () => {
    console.log('App listening on port 3000');
})
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about');
})
app.get('/contact', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'pages/contact.html'))
    res.render('contact');
})
app.get('/post', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'pages/post.html'))
    res.render('post');
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', async (req, res) => {
    await BlogPost.create(req.body)
    res.redirect('/')
})