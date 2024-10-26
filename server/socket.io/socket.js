const { Server } = require("socket.io");
const { createServer } = require("http");

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
