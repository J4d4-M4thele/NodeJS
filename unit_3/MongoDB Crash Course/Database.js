//inserting information
db.crashCourse.insert({
    title: "Post One",
    body: "Post Body",
    category: "News",
    likes: 4,
    tags: ["news", "events"],
    user: {
        fullName: "Jane Doe",
        statuses: "award-winning author and mother"
    },
    date: Date()
})

db.crashCourse.insert({
    title: "Post Two",
    body: "Post Body",
    category: "Technology",
    likes: 4,
    tags: ["artificial intelligence", "innovation"],
    user: {
        fullName: "John Doe",
        statuses: "electrical engineer"
    },
    date: Date()
})

//Updating comments
db.crashCourse.update({ title: "Post One" },
    {
        title: "Post One",
        body: "New Post Body",
        date: Date()
    },
    {
        upsert: true
    }
)

db.crashCourse.update({ title: "Post One" },
    {
        $set: {
            comments: [
                {
                    user: "Jada Mathele",
                    body: "Comment One",
                    date: Date()
                },
                {
                    user: "Tyeishia Jacobs",
                    body: "Comment Two",
                    date: Date()
                }
            ]
        }
    }
)

//using element match
db.crashCourse.find({
    comments: {
        $elemMatch: {
            user:"Jada Mathele"
        }
    }
}).pretty()/*pretty method makes oject readable*/

db.crashCourse.createIndex({
    title: "text"
})

db.crashCourse.find({
    $text: {
        $search: "\"Post 0\""
    }
})