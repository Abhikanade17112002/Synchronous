const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"user",
        required:true
    } ,
    reciver:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"user",
        required:false ,
    } ,
    messagetype:{
        type:String ,
        enum:["text","file"] ,
        required:true
    } ,
    message:{
        type:String ,
        required:function () {
            return this.messageType === "text";
        }
    } ,
    file:{
        type:String ,
        required:function () {
            return this.messageType === "file";
        }

    }
},{timestamps:true}) ;


const messagesModel = mongoose.model("messages",messagesSchema) ;
module.exports = messagesModel ;  