//require schema
const mongoose = require('mongoose');
//require schema
const BlogPost = require('./models/BlogPost');
mongoose.connect('mongodb://127.0.0.1/my_database',
    { useNewUrlParser: true });
//create blog post
BlogPost.create({
    title: "The Mythbuster Guide to Saving Money on Energy Bills",
    body: "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year. They go like this:"
})
.then(blogpost => {console.log(blogpost)})
.catch(error => console.log(error));
//convert all callback functions to promises
    //handle errors
/*(error, blogpost) => {
    console.log(error, blogpost)
})*/

//find record by title
BlogPost.find({
    title: 'The Mythbusters Guide to Saving Money on Energy Bills'
})
.then(blogpost => {console.log(blogpost)})
.catch(error => console.log(error));

//find all records 
BlogPost.find({
    title: /The/
})
.then(blogpost => {console.log(blogpost)})
.catch(error => console.log(error));

//unique id for record
var id = "64ad14fc8c188e4318552aea";

//CRUD functions using id
BlogPost.findById(
    id
)
.then(blogpost => {console.log(blogpost)})
.catch(error => console.log(error));


BlogPost.findByIdAndUpdate(id, {
    title: 'Updated title'
})
.then(blogpost => {console.log(blogpost)})
.catch(error => console.log(error));

BlogPost.findByIdAndDelete(
    id
)
.then(blogpost => {console.log(blogpost)})
.catch(error => console.log(error));