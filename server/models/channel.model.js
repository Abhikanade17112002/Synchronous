const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique:true ,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    ],
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "messages", required: false },
    ],
  },
  { timestamps: true }
);

const channelModel = mongoose.model("channel", channelSchema);
module.exports = channelModel;
