const {handleSearchContacts } = require("../controllers/contacts.controller") ;
const Authenticated = require("../middlewares/auth.middleware");
const router = require("express").Router() ;



router.post("/search",Authenticated,handleSearchContacts) ;



module.exports = router ;


