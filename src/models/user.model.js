import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const userSchema = mongoose.Schema({
   username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true, // To make a feild searcable in mongoDB makes its index true for optimization
   },
    email:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    avatar:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
        default:"",
    },
    watchHistory:{
       // type:[videoSchema]      other approch mini Schema
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }
        ]
    }
    ,
    password:{
        type:String,
        required:[true,"Password is Required!"],   // custom error syntax for true feilds
    },
    refreshToken:{
        type:String,
        required:true,
    }

},{timestamps:true});

userSchema.pre("save",async function(next){   // donot use callback function because callback fn does not have access of this(context).
    if(this.isModified("password"))
        this.password = bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign( 
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        },
    )
}

userSchema.methods.generateRefershToken = function(){
    return jwt.sign(
        {
            _id:this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }
        )
}

export const User = mongoose.model("User",userSchema); 