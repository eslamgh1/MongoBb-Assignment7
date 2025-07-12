import { MongoClient } from 'mongodb'

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);



// connection to DB
export const checkConnectionDb = async ()=> {
  // Use connect method to connect to the server
  await client.connect().then(()=>{
    console.log('DB Connected successfully to server........😀✌');
  }).catch((error)=>{
  console.log('DB Fail to connect the server 😬');
  })
  }


  // create DB
export const db = client.db("bookshop-postman");