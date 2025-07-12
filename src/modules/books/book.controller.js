import { Router } from "express";
import {  createBooksCollection } from "./book.service.js";
import {  createImplicit } from "./book.service.js";
import * as bookAPIsevices from "./book.service.js"


const bookRouter = Router();

bookRouter.post("/books",createBooksCollection)
bookRouter.post("/authors",createImplicit)
bookRouter.post("/logs/capped",bookAPIsevices.createCapped)
bookRouter.post("/books/index",bookAPIsevices.createBooksIndex)
bookRouter.post("/books/insert",bookAPIsevices.insertBook)
bookRouter.post("/books/batch",bookAPIsevices.insertBatch)
bookRouter.post("/books/batch",bookAPIsevices.postLogs)
bookRouter.get("/books/title",bookAPIsevices.getTitle)
bookRouter.delete("/books/delete",bookAPIsevices.deleteBook)
bookRouter.post("/books/aggregate",bookAPIsevices.aggregateBook)






export default bookRouter;