const { default: mongoose } = require("mongoose");
const channelModel = require("../models/channel.model");
const userModel = require("../models/user.model");

const handleFetchAllUserChannels = async (request, response) => {
  try {
    const userId = new mongoose.Types.ObjectId(request.userId);

    const userChannels = await channelModel
      .find({
        $or: [{ admin: userId }, { members: userId }],
      })
      .sort({ updatedAt: -1 });

    return response.json({
      message: "Channels fetched successfully",
      status: true,
      channels: userChannels,
    });
  } catch (error) {}
};

const handleCreateChannel = async (request, response) => {
  try {
    const { name, members } = request.body;

    const adminId = request.userId;
    if (!name || !members) {
      return response.json({
        message: "Please fill in all fields",
        status: false,
      });
    }

    const adminUser = await userModel.findById({
      _id: adminId,
    });

    if (!adminUser) {
      return response.json({
        message: "admin not found ( missing from users )",
        status: false,
      });
    }

    const validateAllChannelMembers = await userModel.find({
      _id: { $in: members },
    });

    if (validateAllChannelMembers.length !== members.length) {
      return response.json({
        message: "One or more members not found ( missing from users )",
        status: false,
      });
    }

    const newChannel = await channelModel.create({
      name,
      members,
      admin: adminId,
    });

    return response.json({
      message: "Channel created successfully",
      status: true,
      channel: newChannel,
    });
  } catch (error) {}
};

const handleFetchAllChannelMessage = async (request, response) => {
  try {
    const channelId  = request.query.channelId

    const channel = await channelModel
      .findById(channelId)
      .populate({
        path: "messages",
        populate: {
          path: "sender",
          select: "firstname lastname email _id profileimage color",
        },
      });




      if( !channel )
      {
        return response.json({
          message: "Channel not found",
          status: false,
          });

      }
      else{
        return response.json({
          message: "Channel messages fetched successfully",
          status: true,
          channel: channel,
          messages:channel.messages
        });
      }

  } catch (error) {
   
    console.log("SOMETHING WENT WRONG WHILE FETCHING CHANNEL CHATS", error);
   
  }
};
module.exports = {
  handleCreateChannel,
  handleFetchAllUserChannels,
  handleFetchAllChannelMessage,
};
