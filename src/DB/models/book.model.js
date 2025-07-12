import { db } from "../connectionDb.js";


//create collection=table=users as a table

const bookModel = db.collection("books")



export default bookModel;