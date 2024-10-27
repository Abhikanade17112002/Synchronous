const {handleGetMessages } = require("../controllers/messages.controller") ;
const Authenticated = require("../middlewares/auth.middleware");
const router = require("express").Router() ;



router.post("/get",Authenticated,handleGetMessages) ;



module.exports = router ;


