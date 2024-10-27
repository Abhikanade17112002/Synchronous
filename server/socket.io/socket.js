const { Server } = require("socket.io");
const messagesModel = require("../models/messages.model") ;

// MAPPING TO SOCKET ID AND USER ID
const userSocketMapping = new Map();

const disconnect = (socket) => {
  console.log("====================================");
  console.log(`CLIENT DISCONNECTED SOCKET ID ${socket.id}`);
  console.log("====================================");

  for (const [userId, socketId] of userSocketMapping.entries()) {
    if (socketId === socket.id) {
      userSocketMapping.delete(userId);
      break;
    }
  }
};


const setUpSocketIO = (server) => {
  try {
    const io = new Server(server, {
      cors: {
        origin: process.env.BASEURL, // Ensure this environment variable is set correctly
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
      },
    });

    // CONNECTION EVENT
    io.on("connection", (socket) => {
      const userId = socket.handshake.query.userId;

      if (userId) {
        userSocketMapping.set(userId, socket.id);
        console.log(
          `CLIENT CONNECTED WITH SOCKET ID ${socket.id} AND USER ID ${userId}`
        );
      } else {
        console.log("NO USER ID FOUND");
      }

      const handleSendMessage = async (message) =>{
        
        try {
          const senderSocketId = userSocketMapping.get(message.sender);
          const reciverSocketId = userSocketMapping.get(message.reciver) ;
      
          const createdMessage = await messagesModel.create(message) ;
        
          const messageData = await messagesModel.findById(createdMessage._id)
          .populate("sender")
          .populate("reciver");
                  
          console.log('====================================');
          console.log(messageData,message.sender,message.reciver,reciverSocketId,senderSocketId,"MSg");
          console.log('====================================');
      
          // If reciver is Online  The Send Message Or Store it 
          if( senderSocketId )
            {

              io.to(senderSocketId).emit("recivemessage", messageData);
            }


          if( reciverSocketId )
          {
            io.to(reciverSocketId).emit("recivemessage", messageData);
          }
         
      
      
        } catch (error) {
          console.log('====================================');
          console.log(`Something Went Wrong While Sending A Message To User ${error}`);
          console.log('====================================');
        }
      }

      // Handle Send Messsage Event 
      socket.on("sendmessage",handleSendMessage)

      // Handle individual socket disconnections
      socket.on("disconnect", () => {
        disconnect(socket);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpSocketIO;
