const jwt = require('jsonwebtoken') ;
const messagesModel = require('../models/messages.model');
const cloudinary = require("../utils/cloudinary");
const deleteServerSideFiles = require("../utils/deleteServerSideFiles") ;
const handleGetMessages = async (request,response) =>{

   
    try {
        const { reciver  } = request.body ;
        const sender = request.userId ;

        if(!sender || !reciver )
        {
            return response.json({message : "sender and reciver id required " ,status:200});
        }


        const conversation = await messagesModel.find({
            $or : [
                {sender : sender , reciver : reciver },
                {sender : reciver , reciver : sender }
                ]
        }).sort({createdAt:1})
          

        return response.json({
            messages:conversation ,
            status:200
        })
    } catch (error) {
      
        console.log("SOMETHING WENT WRONG IN SEARCH CONATCTS");
     
    }
}

const handleUploadFile = async ( request , response ) =>{
    try {

        const  filePath = request.file ;

        if( filePath )
        {
            const uploadResult = await cloudinary.uploader.upload(filePath?.path);
            deleteServerSideFiles(filePath.path);
            return response.json({
                message : "File uploaded successfully",
                status:true,
                file:uploadResult.secure_url
                
                })
        }
        else{
            return response.json({
                message : "File not uploaded",
                status:false
                })
        }
        
    } catch (error) {

        console.log("SOMETHING WENT WRONG IN UPLOAD CHAT FILE",error);

    }
}

module.exports = {
   handleGetMessages ,
   handleUploadFile
}