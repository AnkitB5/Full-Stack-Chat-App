//imports

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authenticationRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./database/connectiontoMongodb.js";
import userRoutes from "./routes/user.routes.js";
 
//variables
const app = express();
const PORT = process.env.PORT || 5000; 

dotenv.config();

app.use(express.json()); //parses the request with json (from req.body (in auth.controllers))
app.use(cookieParser()); //parse cookies

app.use("/api/auth", authenticationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    // '/'http://localhost:PORT/
    res.send("hello!!");
})

app.listen(PORT, ()=> {
    connectToMongoDB();
    console.log('Server running on port '+ PORT);
    }); 