import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config(
    {
        path:"./env"
    }
)
    
const port = process.env.PORT || 8000 

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is Running at Port:${port}`);
    })
})
.catch((error)=>{
    console.log("MongoDB Connection Failed! ",error);
})