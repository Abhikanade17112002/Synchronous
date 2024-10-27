const jwt = require('jsonwebtoken') ;
const messagesModel = require('../models/messages.model');

const handleGetMessages = async (request,response) =>{

   
    try {
        const { reciver  } = request.body ;
        const sender = request.userId ;
        console.log('====================================');
        console.log(sender,reciver,request.body , "SENDERRECIVER");
        console.log('====================================');
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
        console.log('====================================');
        console.log("SOMETHING WENT WRONG IN SEARCH CONATCTS");
        console.log('====================================');
    }
}



module.exports = {
   handleGetMessages
}