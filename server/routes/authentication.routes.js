const {handleUserSignIn , handleUserSignUp , handleUserSignOut } = require("../controllers/authentication.controller") ;
// const Authenticated = require("../middlewares/authentication.middleware");
// const upload = require("../middlewares/multer") ;
const router = require("express").Router() ;


// Sign In 
router.post("/signin",handleUserSignIn) ;
// Sign Up
router.post("/signup",handleUserSignUp) ;
// Sign Out
router.get("/signout",handleUserSignOut) ;
// Profile Update
// router.post("/profile/update",Authenticated,upload.fields([
//     { name: 'profilePic', maxCount: 1 },
//     { name: 'resume', maxCount: 1 }
// ]),handleUserProfileUpdate) ;

module.exports = router ;