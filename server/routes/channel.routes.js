const {
    handleCreateChannel,
    handleFetchAllUserChannels,
    handleFetchAllChannelMessage
  } = require("../controllers/channel.controller");
  const Authenticated = require("../middlewares/auth.middleware");
  const router = require("express").Router();
  
  router.post("/createchannel", Authenticated, handleCreateChannel);
  router.get("/fetchuserchannels", Authenticated, handleFetchAllUserChannels);
  router.get("/fetchuserchannelmessages", Authenticated, handleFetchAllChannelMessage);
 
  module.exports = router;
  