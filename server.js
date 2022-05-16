global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const expressRateLimit   = require("express-rate-limit");
const server = express();
const sanitize = require("./middlewares/sanitize");
const playersController = require("./controllers/players-controller");
const authController = require("./controllers/auth-controller");

server.use(express.json());
server.use("/api", expressRateLimit({
    windowMs: 1000, // 1 second
    max: 20, // limit each IP to 5 requests per windowMs
    message: "Are You a Hacker?" 
}));
// server.use(cookie());
server.use(sanitize);
server.use(cors({origin:"*"}));
server.use(fileUpload());

server.use("/api/players",playersController);
server.use("/api/auth",authController);

const port = process.env.PORT || 3001;
server.listen(port, () => console.log("Listening..."));