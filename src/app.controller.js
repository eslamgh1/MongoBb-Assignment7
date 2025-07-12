import { checkConnectionDb } from "./DB/connectionDb.js"
import bookRouter from "./modules/books/book.controller.js"
import userRouter from "./modules/user.controller.js"


const bootstrap = ({app,express})=>{
  app.use(express.json())

  checkConnectionDb()
  app.use("/users",userRouter)
  app.use("/collection",bookRouter)




app.use("{/*demo}",(req,res,next)=>{
  return res.status(404).json({message: `404 URL is not found ${req.originalUrl}`})
})
}

export default bootstrap;