import { asyncHandler } from "../utils/asyncHandler.js";

const videoDelete = asyncHandler(async(req,res)=>{
    res.status(200).json({
        message:"Video deleted Successfully!"
    })
})

 export { videoDelete };