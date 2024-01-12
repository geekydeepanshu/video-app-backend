const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).reject((err)=>next(err))
    }
}


export {asyncHandler};




// const asyncHandler = (fn)=> async(req,res,next)=>{
//     try{
//         await fn(req,res,next);
//     }catch(error){
//         res.status(error.code).json({
//             succes:false,
//             message:error.message,
//         })
//     }
// }

