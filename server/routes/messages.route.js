const {handleGetMessages , handleUploadFile } = require("../controllers/messages.controller") ;
const Authenticated = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer");
const router = require("express").Router() ;



router.post("/get",Authenticated,handleGetMessages) ;
router.post("/upload",Authenticated,upload.single("file"),handleUploadFile) ;



module.exports = router ;


