const jwt = require('jsonwebtoken')
const userModel = require("../models/user.model");
const cloudinary = require("../utils/cloudinary");
const deleteServerFile = require("../utils/deleteServerSideFiles");
const {
  hashPassword,
  comparePassword,
  verifyToken,
  generateToken,
} = require("../utils/auth");

const handleUserSignUp = async (request, response) => {
  try {
    const { username, email, password } = request.body;

    console.log({ username, email, password });

    if (!email || !username || !password) {
      return response.status(200).json({
        message: "please fill all the fields ",
        status: false,
      });
    }

    const checkExistingUser = await userModel.findOne({ email });

    if (checkExistingUser) {
      return response.status(200).json({
        message: "user already exists !",
        status: false,
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await userModel.create({
      email,
      username,
      password: hashedPassword,
    });

    // sign JWT
    const tokenData = {
      userId: newUser._id,
      email: newUser.email,
    };
    const signedToken = await generateToken(tokenData, process.env.JWT);

    if (!signedToken) {
      return response.status(500).json({
        message: "Error generating token",
        status: false,
      });
    }

    response
      .status(200)
      .cookie("jwttoken", signedToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: "/",
      })
      .json({
        message: "user created successfully",
        status: true,
        token: signedToken,
        user: newUser,
      });
  } catch (error) {
    console.log(error);
    response.status(200).json({
      message: "something went wrong in sign up ",
      status: false,
    });
  }
};

const handleUserSignIn = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(200).json({
        message: "please fill all the fields",
        status: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return response.status(200).json({
        message: "incorrect email or password (user not found)",
        status: false,
      });
    }

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return response.status(200).json({
        message: "incorrect email or password (user not found)",
        status: false,
      });
    }
    const tokenData = {
      userId: user._id,
      email: user.email,
    };

    const generatedToken = await generateToken(tokenData, process.env.JWT);

    return response
      .status(200)
      .cookie("jwttoken", generatedToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: "/",
      })
      .json({
        message: "login successfull",
        status: true,
        token: generatedToken,
        user,
      });
  } catch (error) {
    console.log(error);

    response.status(200).json({
      message: "something went wrong in sign in ",
      status: false,
    });
  }
};

const handleUserSignOut = async (request, response) => {
  try {
    return response
      .status(200)
      .clearCookie("jwttoken", {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      })
      .json({
        message: "logout successful",
        status: true,
      });
  } catch (error) {
    return response.status(200).json({
      message: "something went wrong in sign out ",
      status: false,
    });
  }
};

const handleGetUserInfo = async (request , response ) =>{
  try {
    
    const checkExistingUser = await userModel.findOne({ _id:request.userId });
    if (checkExistingUser) {
      const tokenData = {
        userId: checkExistingUser._id,
        email: checkExistingUser.email,
      }
      const generatedToken = await generateToken(tokenData,process.env.JWT) ;
      return response 
      .status(200)
      .cookie("jwttoken", generatedToken, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        path: "/",
      })
      .json({
        message: "login successfull",
        status: true,
        token: generatedToken,
        user:checkExistingUser,
      });
    } else {
      response.status(200).clearCookie("jwttoken").json({
        message: "user not found",
        status: false,
        user:null
      })
    }
  } catch (error) {
    console.log('====================================');
    console.log("SOMETHING WENT WRONG IN GET USER INFO",error);
    console.log('====================================');
  }
}
const handleUserProfileUpdate = async (request, response) => {
  try {
    const { firstname, lastname, color } = request.body;
    const profileImagePath = request?.file?.path;
    // const resumePath = request?.files?.resume[0]?.path;
    let profileURL ="";
    if( profileImagePath)
    {
      profileURL = await cloudinary.uploader.upload(profileImagePath);
    }
    
    

    const userId = request.userId;

    // Find the user by ID
    let user = await userModel.findById(userId);
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        status: false,
      });
    }

    const updateInfo = {};
    if (firstname) updateInfo.firstName = firstname;
    if (lastname) updateInfo.lastName = lastname;
    if (color === 0 || color ) updateInfo.color = color;
    if( profileImagePath) {
      if( profileURL ) updateInfo.profileimage = profileURL?.secure_url ;
    }
    else{
       updateInfo.profileimage = null ;
    }
   
    updateInfo.profilesetup = true ;



    if( profileImagePath){
      deleteServerFile(profileImagePath) ;
    }
    
    // Update the user data using findByIdAndUpdate for cleaner updates
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateInfo,
      { new: true } 
    );

    return response.status(200).json({
      message: "User profile updated successfully",
      status: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log("Error updating profile: ", error);
    return response.status(500).json({
      message: "Something went wrong while updating profile",
      status: false,
    });
  }
};

const handleRemoveUserProfile = async (request,response)=>{
  try {
    const userId = request.userId;

    // Find the user by ID
    let user = await userModel.findById(userId);
    if (!user) {
      return response.status(404).json({
        message: "User not found",
        status: false,
      });
    }

       const updateInfo = {};
       updateInfo.profileimage = null ;

    
    // Update the user data using findByIdAndUpdate for cleaner updates
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateInfo,
      { new: true } 
    );

    return response.status(200).json({
      message: "User Profile Image Removed successfully",
      status: true,
      user: updatedUser,
    });
  } catch (error) {
    
  }
}
module.exports = {
  // export the functions to be used in other files
  handleUserSignUp,
  handleUserSignIn,
  handleUserSignOut,
  handleGetUserInfo,
  handleUserProfileUpdate,
  handleRemoveUserProfile
};
