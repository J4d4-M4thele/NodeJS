//links to blogpost schema
const BlogPost = require('../models/BlogPost.js')

//renders homepage
module.exports = async (req, res) =>{
const blogposts = await BlogPost.find({})
res.render('index',{
blogposts
});
}