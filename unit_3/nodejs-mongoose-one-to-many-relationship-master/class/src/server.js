const mongoose = require("mongoose");

const db = require("./models");

// const createTutorial = function (tutorial) {
//     return db.Tutorial.create(tutorial).then(docTutorial => {
//         console.log("\n>> Created Tutorial:\n", docTutorial);
//         return docTutorial;
//     });
// };

// const createImage = function (tutorialId, image) {
//     return db.Image.create(image).then(docImage => {
//         console.log("\n>> Created Image:\n", docImage);
//         return db.Tutorial.findByIdAndUpdate(
//             tutorialId,
//             {
//                 $push: {
//                     images: {
//                         _id: docImage._id,
//                         url: docImage.url,
//                         caption: docImage.caption
//                     }
//                 }
//             },
//             { new: true, useFindAndModify: false }
//         );
//     });
// };

/***************RUN FUNCTION ADDING IMAGES TO DB******* */
// const run = async function () {
//     var tutorial = await createTutorial({
//         title: "Tutorial #1",
//         author: "bezkoder"
//     });

//     tutorial = await createImage(tutorial._id, {
//         path: "sites/uploads/images/mongodb.png",
//         url: "/images/mongodb.png",
//         caption: "MongoDB Database",
//         createdAt: Date.now()
//     });
//     console.log("\n>> Tutorial:\n", tutorial);

//     tutorial = await createImage(tutorial._id, {
//         path: "sites/uploads/images/one-to-many.png",
//         url: "/images/one-to-many.png",
//         caption: "One to Many Relationship",
//         createdAt: Date.now()
//     });
//     console.log("\n>> Tutorial:\n", tutorial);
// };

/***************RUN FUNCTION ADDING COMMENTS TO DB******* */
// const run = async function () {
//     var tutorial = await createTutorial({
//         title: "Tutorial #1",
//         author: "bezkoder"
//     });

//     tutorial = await createComment(tutorial._id, {
//         username: "jack",
//         text: "This is a great tutorial.",
//         createdAt: Date.now()
//     });
//     console.log("\n>> Tutorial:\n", tutorial);

//     tutorial = await createComment(tutorial._id, {
//         username: "mary",
//         text: "Thank you, it helps me alot.",
//         createdAt: Date.now()
//     });
//     console.log("\n>> Tutorial:\n", tutorial);
//     tutorial = await getTutorialWithPopulate(tutorial._id);
//     console.log("\n>> populated Tutorial:\n", tutorial);
// };

const createCategory = function(category) {
    return db.Category.create(category).then(docCategory => {
      console.log("\n>> Created Category:\n", docCategory);
      return docCategory;
    });
  };
  
  const addTutorialToCategory = function(tutorialId, categoryId) {
    return db.Tutorial.findByIdAndUpdate(
      tutorialId,
      { category: categoryId },
      { new: true, useFindAndModify: false }
    );
  };

  

mongoose
    .connect("mongodb://127.0.0.1/bezkoder_db", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error("Connection error", err));

run();