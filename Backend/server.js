//imports

import express from "express";
import dotenv from "dotenv";

import authenticationRoutes from "./routes/authroutes.js";
import connectToMongoDB from "../database/connectiontoMongodb.js";

//variables

const app = express();
const PORT = process.env.PORT || 5000; 

dotenv.config();


app.use(express.json()); //parses the request with json (from req.body (in auth.controllers))
app.use("/api/auth", authenticationRoutes);


// app.get("/", (req, res) => {
//     // '/'http://localhost:PORT/
//     res.send("hello!!");
// })




app.listen(PORT, ()=> {
    connectToMongoDB();
    console.log('Server running on port '+ PORT);
    }); 
