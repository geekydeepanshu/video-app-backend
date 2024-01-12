import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});



const fileUpload = async(localFilePath)=>{
    try{
        if(localFilePath)
        {
            const response = await cloudinary.uploader.upload(localFilePath,{ resource_type:"auto"});
            console.log("File Uploaded Successfully on Cloud! ",response.url);
            fs.unlinkSync(localFilePath);  // Added by me
            return response;
        }
        return null;
        
    }catch(error){
        fs.unlinkSync(localFilePath);
        console.log("Error::",error);
        return null ;
    }
}


export { fileUpload };