const jwt = require('jsonwebtoken')
const userModel = require("../models/user.model");

const handleSearchContacts = async (request,response) =>{


    try {
        const { searchterm } = request.body ;
        console.log('====================================');
        console.log(searchterm);
        console.log('====================================');
        if(!searchterm)
        {
            return response.json({message : "search term required" ,status:200});
        }


        const contacts = await userModel.find({
            $and: [
              { _id: { $ne: request.userId } }, // Exclude the user making the request
              {
                $or: [
                  { firstname: { $regex: searchterm, $options: "i" } }, // Partial and case-insensitive match on firstname
                  { lastname: { $regex: searchterm, $options: "i" } }, // Partial and case-insensitive match on lastname
                  { email: { $regex: searchterm, $options: "i" } } // Partial and case-insensitive match on email
                ]
              }
            ]
          });
          

        return response.json({
            contacts ,
            status:200
        })
    } catch (error) {
        console.log('====================================');
        console.log("SOMETHING WENT WRONG IN SEARCH CONATCTS");
        console.log('====================================');
    }
}



module.exports = {
    handleSearchContacts
}