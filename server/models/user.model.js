const mongoose = require("mongoose") ;


const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:false ,
    },
    lastname:{
        type:String,
        required:false,
        },
    profilesetup:{
        type:Boolean,
        default:false,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    color:{
        type:Number,
        default:0,
        
    },
    profileimage:{
    type:String,
    default:"",
    }
},{timestamps:true}) ;

const userModel = mongoose.model("user",userSchema) ;
module.exports = userModel ; 