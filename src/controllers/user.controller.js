import {asyncHandler} from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async(req,res)=>{
    res.status(200).json({
        messege:"Learing tech is so much intersting and i am enjoying it so much!"
    })
})

export { registerUser };