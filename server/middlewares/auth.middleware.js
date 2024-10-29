const jwt = require("jsonwebtoken") ;
const Authenticated = async ( request , response , next ) =>{
    try {
        const incomingToken = request.cookies.jwttoken ;

        if(!incomingToken )
        {  
           return  response.status(200).json({
                message : "Unauthorized User" ,
                status:false 
            })
        }
        const decodedToken = await jwt.verify(incomingToken,process.env.JWT) ;

        if( !decodedToken )
        {
           return response.status(401).json({
                message : "invalid token" ,
                status:false})
        }
        request.user = decodedToken ;
        request.userId = decodedToken.payload.userId ;
        next() ;
    } catch (error) {
        console.log("Auth Middleware ",error);
        
    }
    
}
module.exports = Authenticated ;