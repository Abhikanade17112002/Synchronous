const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const messagesModel = require("../models/messages.model");
const { default: mongoose } = require("mongoose");

const handleSearchContacts = async (request, response) => {
  try {
    const { searchterm } = request.body;
    console.log("====================================");
    console.log(searchterm);
    console.log("====================================");
    if (!searchterm) {
      return response.json({ message: "search term required", status: 200 });
    }

    const contacts = await userModel.find({
      $and: [
        { _id: { $ne: request.userId } }, // Exclude the user making the request
        {
          $or: [
            { firstname: { $regex: searchterm, $options: "i" } }, // Partial and case-insensitive match on firstname
            { lastname: { $regex: searchterm, $options: "i" } }, // Partial and case-insensitive match on lastname
            { email: { $regex: searchterm, $options: "i" } }, // Partial and case-insensitive match on email
          ],
        },
      ],
    });

    return response.json({
      contacts,
      status: 200,
    });
  } catch (error) {
    console.log("====================================");
    console.log("SOMETHING WENT WRONG IN SEARCH CONATCTS");
    console.log("====================================");
  }
};

const handleGetAllContactsForChannel = async (request, response) => {
  try {
    const currentLoggedInUser = request.userId;
    console.log("====================================");
    console.log(currentLoggedInUser, "currentLoggedInUser");
    console.log("====================================");

    const users = await userModel.find(
      {
        _id: { $ne: currentLoggedInUser }, // Exclude the user making the request
      },
      "firstname  lastname  _id  email"
    );

    const contacts = users.map((contact) => (
      {
        label: contact.firstname
          ? `${contact.firstname} ${contact.lastname}`
          : `${contact.email}`,

        value:contact._id    
      }
    ));
    return response.json({
      contacts,
      status: 200,
    });
  } catch (error) {
    console.log("====================================");
    console.log("SOMETHING WENT WRONG IN SEARCH CONATCTS");
    console.log("====================================");
  }
};

const handleGetDmContacts = async (request, response) => {
  try {
    const { userId } = request;
    const userObjectId = new mongoose.Types.ObjectId(userId);
    console.log("====================================");
    console.log(userId, "PPPPPPP");
    console.log("====================================");

    const contacts = await messagesModel.aggregate([
      {
        $match: {
          $or: [{ sender: userObjectId }, { reciver: userObjectId }], // Ensure this matches your schema field
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort messages by creation date to get the latest messages at the top
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userObjectId] },
              then: "$reciver",
              else: "$sender",
            },
          },
          lastMessageTime: { $first: "$createdAt" }, // Get the first (latest) createdAt value
        },
      },
      {
        $lookup: {
          from: "users", // Referencing the user collection
          localField: "_id", // Using the _id field from the group stage
          foreignField: "_id", // Refers to the _id in the user collection
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo", // Decompose the array created by the lookup
      },
      {
        $project: {
          _id: 1, // Keep the contact ID
          lastMessageTime: 1, // Keep the last message time
          email: "$contactInfo.email", // Extract email from contact info
          firstname: "$contactInfo.firstname", // Extract first name from contact info
          lastname: "$contactInfo.lastname", // Extract last name from contact info
          profileimage: "$contactInfo.profileimage", // Extract profile image from contact info
          color: "$contactInfo.color", // Extract color from contact info
        },
      },
      {
        $sort: { lastMessageTime: -1 }, // Sort by last message time in descending order
      },
    ]);

    // Return the result
    return response.json({
      status: 200,
      contacts,
    });
  } catch (error) {
    console.log("====================================");
    console.log(`Smething Went Wrong While Fetching DM LIST`, error);
    console.log("====================================");
  }
};

module.exports = {
  handleSearchContacts,
  handleGetDmContacts,
  handleGetAllContactsForChannel
};
