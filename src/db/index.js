import mongoose from "mongoose";
import {DB_Name} from "../constants.js";
import dotenv from "dotenv";
 
dotenv.config({
    path:'./env'
})



const connectDB= async()=>{
    try{
       const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URI}/${DB_Name}`);
       console.log(`Mongodb Connected Successfuly !! DB HOST:`,connectionInstance.connection.host);
    }catch(error){
        console.log("Error in DB Connection",error);
        process.exit(1);
    }
}


export default connectDB;