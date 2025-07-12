import { db } from "../../DB/connectionDb.js"; // This direct import from DB not from models Folder
// import bookModel from "../../DB/models/book.model.js";

export const createBooksCollection = async (req, res, next) => {
  try {
    await db.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
        },
      },
    });

    console.log("Books collection are created with validation rule.");
    return res.status(201).json({ message: "ok" });
  } catch (error) {
    console.error("My message - Error creating book:", error);
    return res
      .status(500)
      .json({ message: "Error creating book", error: error.message });
  }
};

export const createImplicit = async (req, res, next) => {
  try {
    const { name, nathonalty } = req.body;
    const book = await db.collection("author").insertOne({
      name,
      nathonalty,
    });

    return res.status(201).json({ message: "ok", book });
  } catch (error) {
    console.error("My message - Error creating book:", error);
    return res.status(500).json({
      message: "My message- Error creating book",
      error: error.message,
    });
  }
};

export const createCapped = async (req, res, next) => {
  try {
    const book = await db.createCollection("logs", {
      capped: true,
      size: 1000000,
    });
    return res.status(201).json({ message: "ok", book });
  } catch (error) {
    console.error("My message - Error creating book:", error);
    return res.status(500).json({
      message: "My message- Error creating book",
      error: error.message,
    });
  }
};

export const createBooksIndex = async (req, res, next) => {
  try {
    const book = await db.collection("books").createIndex({ title: 1 });

    return res.status(201).json({ message: "ok", book });
  } catch (error) {
    console.error("My message - Error creating book:", error);
    return res.status(500).json({
      message: "My message- Error creating book",
      error: error.message,
    });
  }
};

export const insertBook = async (req, res, next) => {
  const { title, author, year, genres } = req.body;
  try {
    const book = await db.collection("books").insertOne({
      title,
      author,
      year,
      genres,
    });

    return res.status(201).json({ message: "ok", book });
  } catch (error) {
    console.error("My message - Error creating book:", error);
    return res.status(500).json({
      message: "My message- Error creating book",
      error: error.message,
    });
  }
};
export const insertBatch = async (req, res, next) => {
  const { title, author, year, genres } = req.body;
  try {
    const book = await db.collection("books").insertMany([
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

    return res.status(201).json({ message: "ok", book });
  } catch (error) {
    console.error("My message - Error creating book:", error);
    return res.status(500).json({
      message: "My message- Error creating book",
      error: error.message,
    });
  }
};
export const postLogs = async (req, res, next) => {
  const { title, author, year, genres } = req.body;
  try {
    const book = await db.collection("books").insertMany([
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

    return res.status(201).json({ message: "ok", book });
  } catch (error) {
    console.error("My message - Error creating book:", error);
    return res.status(500).json({
      message: "My message- Error creating book",
      error: error.message,
    });
  }
};
//! check parse
export const getTitle = async (req, res, next) => {

  try {
    const book = await db.collection("books").find({ "title": "Brave new world" })

    return res.status(201).json({ message: "ok"});
    
  } catch (error) {
    console.error("My message - Error creating book:", error);
    return res.status(500).json({
      message: "My message- Error creating book",
      error: error.message,
    });
  }
};
export const postBook = async (req, res, next) => {

  try {
    const book = await db.collection("books").find({ 
  year: { 
    $type: ["int"] 
  } 
})
    return res.status(201).json({ message: "ok"});
    
  } catch (error) {
    console.error("My message - Error creating book:", error);
    return res.status(500).json({
      message: "My message- Error creating book",
      error: error.message,
    });
  }
};
export const deleteBook = async (req, res, next) => {

  try {
    const book = await db.collection("books").deleteMany({ year: { $lt: 2000 } })
    return res.status(201).json({ message: "ok"});
    
  } catch (error) {
    console.error("My message - Error creating book:", error);
    return res.status(500).json({
      message: "My message- Error creating book",
      error: error.message,
    });
  }
};
export const aggregateBook = async (req, res, next) => {

  try {
    const book = await db.collection("books").aggregate([
  {
    $lookup: {
      from: "logs",      
      localField: "_id",  
      foreignField: "bookId", 
      as: "logs"   
    }
  }
])
    return res.status(201).json({ message: "ok"});
    
  } catch (error) {
    console.error("My message - Error creating book:", error);
    return res.status(500).json({
      message: "My message- Error creating book",
      error: error.message,
    });
  }
};



