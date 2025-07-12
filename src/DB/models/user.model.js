import { db } from "../connectionDb.js";


//create collection=table=users as a table
const userModel = db.collection("users")



export default userModel;