require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDatabase = require("./database/connectToDatabase");
const AuthenticationRouter = require("./routes/authentication.routes");
connectToDatabase()
  .then((connectionInstance) => {
    const App = express();

    // Middleware
    App.use(express.json());
    App.use(
      cors({
        origin:process.env.BASEURL,
        credentials: true,
        methods:["POST","PATCH","GET","DELETE","PUT"]
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

    App.get("/", (request, response) => {
      response.send("Hello World");
    });

    App.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("====================================");
    console.log("DATABASE CONNECTION ERROR :: ", error);
    console.log("====================================");
  });
