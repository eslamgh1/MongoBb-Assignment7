1-Create an explicit collection named “books” with a validation rule to ensure that each document has a non-empty “title” field.

db.createCollection("books", {
validator: {
$jsonSchema: {
bsonType: "object",
required: ["title"],
properties: {
title: {
bsonType: "string",
minLength: 1,
description: "must be a string and is required",
},
},
},
},
});
==================================
{
ok: "1",
}

-------------------------------------------------------------------------------

2-Create an implicit collection by inserting data directly into a new collection named “authors”.

db.author.insertOne(
{
name: "authors1",
nathonalty:"british"
}
)
==================================
{acknowledged: true,
insertedId: ObjectId('686ed058d81be81fe37975c2')
}

---

3- Create a capped collection named “logs” with a size limit of 1MB. (0.5 Grade)
• URL: POST /collection/logs/capped
db.createCollection("logs", { capped: true, size: 1000000 })
==================================
{ ok: 1 }

---

4-Create an index on the books collection for the title field. (0.5 Grade)
• URL: POST /collection/books/index
db.books.createIndex({ title: 1 })
===========
title_1


------------------------------------------------------------------------------------------------------

5- Insert one document into the books collection. (0.5 Grade)
db.books.insertOne({
title: "book1",
author: "Ali",
year: 1937,
genres:["Fanatasy","Adventure"]
})
===================================
{
acknowledged: true,
insertedId: ObjectId('686ee4537b6dd4590f10dd91')
}

-------------------------------------------------------------------------------------------

6-Insert multiple documents into the books collection with at least three records. (0.5 Grade)
• URL: POST /books/batch
db.books.insertMany([
{
title: "Future",
author: "George orwell",
year: 2020,
genres:["Science fiction"]
},
{
title: "To kill author",
author: "harobioo leoo",
year: 1960,
genres:["Classic" ,"Fiction"]
},
{
title: "Brave new world",
author: "Aldous Hulexy",
year: 2006,
genres:["Dystopian","Science fiction"]
}
])
=================================
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('686f4bbc311e940a0da038de'),
    '1': ObjectId('686f4bbc311e940a0da038df'),
    '2': ObjectId('686f4bbc311e940a0da038e0')
  }
}
=================================
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('686f4bbc311e940a0da038de'),
    '1': ObjectId('686f4bbc311e940a0da038df'),
    '2': ObjectId('686f4bbc311e940a0da038e0')
  }
}
========================
{
  acknowledged: true,
  insertedId: ObjectId('686f4d44311e940a0da038e2')
}
------------------------------------------------------------------------------------
8. Update the book with title “Future” change the year to be 2022. (0.5 Grade)
• URL: PATCH/books/Future

db.books.updateOne( { title: "Future" },
{
  $set: {
    year: "2020"
  }
})
==========================
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
-----------------------------------------------------------------------------------------------------------
9-Find a Book with title “Brave New World”. (0.5 Grade)
• URL: GET /books/title
db.books.find({ "title": "Brave new world" })
========================================
{
  _id: ObjectId('686f4bbc311e940a0da038e0'),
  title: 'Brave new world',
  author: 'Aldous Hulexy',
  year: 2006,
  genres: [
    'Dystopian',
    'Science fiction'
  ]
}
-----------------------------------------------------------------------------------------------------------
10-Find all books published between 1990 and 2010. (0.5 Grade)
db.books.find({ 
  year: { 
    $gte: 1990, 
    $lte: 2010 
  } 
})
============================
{
  _id: ObjectId('686f4bbc311e940a0da038e0'),
  title: 'Brave new world',
  author: 'Aldous Hulexy',
  year: 2006,
  genres: [
    'Dystopian',
    'Science fiction'
  ]
}
-----------------------------------------------------------------------------------------------------------
11-Find books where the genre includes "Science Fiction".(0.5 Grade)

db.books.find( { "genres": "Science fiction" } )
======================================
{
  _id: ObjectId('686f4bbc311e940a0da038de'),
  title: 'Future',
  author: 'George orwell',
  year: '2020',
  genres: [
    'Science fiction'
  ]
}
{
  _id: ObjectId('686f4bbc311e940a0da038de'),
  title: 'Future',
  author: 'George orwell',
  year: '2020',
  genres: [
    'Science fiction'
  ]
}
-----------------------------------------------------------------------------------------------------------
12. Skip the first two books, limit the results to the next three, sorted by year in descending order.
    
db.books.find().sort({ year: -1 }).skip(2).limit(3)
=====================
{
  _id: ObjectId('686f4bbc311e940a0da038df'),
  title: 'To kill author',
  author: 'harobioo leoo',
  year: 1960,
  genres: [
    'Classic',
    'Fiction'
  ]
}
{
  _id: ObjectId('686ee4537b6dd4590f10dd91'),
  title: 'book1',
  author: 'Ali',
  year: 1937,
  genres: [
    'Fanatasy',
    'Adventure'
  ]
}
{
  _id: ObjectId('686f5fc7761a6fea399b0d67'),
  title: 'book from post man'
}
-----------------------------------------------------------------------------------------------------------
13- Find books where the year field stored as an integer. (0.5 Grade)


db.books.find({ 
  year: { 
    $type: ["int"] 
  } 
})
==========================
{
  _id: ObjectId('686ee4537b6dd4590f10dd91'),
  title: 'book1',
  author: 'Ali',
  year: 1937,
  genres: [
    'Fanatasy',
    'Adventure'
  ]
}
{
  _id: ObjectId('686f4bbc311e940a0da038df'),
  title: 'To kill author',
  author: 'harobioo leoo',
  year: 1960,
  genres: [
    'Classic',
    'Fiction'
  ]
}
-----------------------------------------------------------------------------------------------------------
14. Find all books where the genres field does not include any of the genres "Horror" or "Science Fiction".
db.books.find({
  genres: {
    $nin: ["Horror", "Science Fiction"]
  }
})

{
  _id: ObjectId('686ee4537b6dd4590f10dd91'),
  title: 'book1',
  author: 'Ali',
  year: 1937,
  genres: [
    'Fanatasy',
    'Adventure'
  ]
}
{
  _id: ObjectId('686f4bbc311e940a0da038de'),
  title: 'Future',
  author: 'George orwell',
  year: '2020',
  genres: [
    'Science fiction'
  ]
}
-----------------------------------------------------------------------------------------------------------
15-Delete all books published before 2000.
db.books.deleteMany({ year: { $lt: 2000 } })
=======================================
{
  acknowledged: true,
  deletedCount: 2
}
-----------------------------------------------------------------------------------------------------------

16-Using aggregation Functions, Filter books published after 2000 and sort them by year descending.

db.books.aggregate([
  {
    $match: {
      year: { $gt: 2000 }  
    }
  },
  {
    $sort: {
      year: -1  
    }
  }
])
  {
_id: ObjectId('686f4bbc311e940a0da038de'),
  title: 'Future',
  author: 'George orwell',
  year: 2020,
  genres: [
    'Science fiction'
  ]
}
  {
  _id: ObjectId('686f4bbc311e940a0da038e0'),
  title: 'Brave new world',
  author: 'Aldous Hulexy',
  year: 2006,
  genres: [
    'Dystopian',
    'Science fiction'
  ]
}

-----------------------------------------------------------------------------------------------------------
17. Using aggregation functions, Find all books published after the year 2000. For each matching book, show only the title, author, and year fields.
    
db.books.aggregate([
  {
    $match: {
      year: { $gt: 2000 } 
    }
  },
  {
    $project: {
      title: 1,    
      author: 1,    
      year: 1,      
      _id: 0       
    }
  },
  {
    $sort: {
      year: -1     
    }
  }
])

=========================================

{
  title: 'Future',
  author: 'George orwell',
  year: 2020
}
{
  title: 'Brave new world',
  author: 'Aldous Hulexy',
  year: 2006
}

-----------------------------------------------------------------------------------------------------------
18-Using aggregation functions,break an array of genres into separate documents.

db.books.aggregate([
  {
    $unwind: "$genres"  
  },
  {
    $project: {
      title: 1,
      genres: 1,
      _id: 0
    }
  }
])

=============
{
  title: 'Future',
  genres: 'Science fiction'
}
{
  title: 'Brave new world',
  genres: 'Dystopian'
}
{
  title: 'Brave new world',
  genres: 'Science fiction'
}

---------------------------------------------------------------------------------------------------
19- Using aggregation functions, Join the books collection with the logs collection

db.books.aggregate([
  {
    $lookup: {
      from: "logs",      
      localField: "_id",  
      foreignField: "bookId", 
      as: "logs"   
    }
  }
])
=================================
{
  _id: ObjectId('686f4bbc311e940a0da038de'),
  title: 'Future',
  author: 'George orwell',
  year: 2020,
  genres: [
    'Science fiction'
  ],
  logs: []
}


    