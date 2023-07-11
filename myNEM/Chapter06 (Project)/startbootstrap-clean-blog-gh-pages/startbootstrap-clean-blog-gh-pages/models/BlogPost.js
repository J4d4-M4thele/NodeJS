//require mongoose
const mongoose = require('mongoose')
//create a blog post schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String
});
const BlogPost = mongoose.model('BlogPost',BlogPostSchema);

//export blogpost model
module.exports = BlogPost;