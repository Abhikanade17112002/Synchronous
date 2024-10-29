require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./database/connectToDatabase");
const AuthenticationRouter = require("./routes/authentication.routes");
const ContactsRouter = require("./routes/contacts.routes");
const MessagesRouter = require("./routes/messages.route");
const setUpSocketIO = require("./socket.io/socket");
const channelRouter = require("./routes/channel.routes");
const path = require("path") ;
connectToDatabase()
  .then((connectionInstance) => {
    const App = express();
    const __dirname = path.resolve() ;

    // Middleware
    App.use(express.json());
    App.use(
      cors({
        origin: process.env.BASEURL,
        credentials: true,
        methods: ["POST", "PATCH", "GET", "DELETE", "PUT"],
      })
    );
    App.use(cookieParser());
    App.use(
      express.urlencoded({
        extended: true,
      })
    );

    // Routes
    App.use("/api/auth", AuthenticationRouter);
    App.use("/api/contacts", ContactsRouter);
    App.use("/api/messages", MessagesRouter);
    App.use("/api/channels", channelRouter);
    App.use(express.static(path.join(__dirname,"/client/dist")));
    App.get("*", (request, response) => {
      response.sendFile(path.join(__dirname,"/client/dist/index.html"));
    })
    App.get("/", (request, response) => {
      response.send("Hello World");
    });
   
    const server = App.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
    setUpSocketIO(server);
    
    

   
  })
  .catch((error) => {
    console.log("====================================");
    console.log("DATABASE CONNECTION ERROR :: ", error);
    console.log("====================================");
  });
