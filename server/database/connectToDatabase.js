const mongoose = require("mongoose") ;



const connectToDatabase = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONDODBURL);


        console.log('====================================');
        console.log("DATABASE CONNECTED SUCCESFULLY");
        console.log('====================================');
        return connectionInstance;

    } catch (error) {
        console.log('====================================');
        console.log("DATABASE CONNECTION ERROR :: ",error);
        console.log('====================================');
    }
}


module.exports = connectToDatabase ;