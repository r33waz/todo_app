import express from "express"
import "dotenv/config.js";
import mainRouter from "./routes/main.js"
const app = express()

app.use(mainRouter)

app.listen(process.env.PORT,()=>{
    console.log(`server running in port ${process.env.PORT}`)
})