const express = require('express');
const path = require('path');
const app = new express();
const ejs = require('ejs');
//requiring mongoose, connecting to a database 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database',
{ useNewUrlParser: true })
app.set('view engine', 'ejs');
app.use(express.static('public'));

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