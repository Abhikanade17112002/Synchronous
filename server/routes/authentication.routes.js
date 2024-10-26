const {handleUserSignIn,handleRemoveUserProfile , handleUserProfileUpdate, handleUserSignUp , handleUserSignOut , handleGetUserInfo } = require("../controllers/authentication.controller") ;
const Authenticated = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer") ;
const router = require("express").Router() ;


// Sign In 
router.post("/signin",handleUserSignIn) ;
// Sign Up
router.post("/signup",handleUserSignUp) ;
// Sign Out
router.post("/signout",Authenticated,handleUserSignOut) ;


router.get("/getinfo",Authenticated,handleGetUserInfo) ;
// Profile Update
router.post("/profile/update",upload.single("profileimage"),Authenticated,handleUserProfileUpdate) ;
router.post("/profile/update/remove",Authenticated,handleRemoveUserProfile) ;
module.exports = router ;

