import JWT from "jsonwebtoken"
import User from "../models/userModel.js";

//creating checks to prevent unauthorized access
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.JWT;
        if(!token){
            return res.status(401).json({error: "Unauthorized Access: No Token Provided" });
        }

        const decodedToken = JWT.verify(token, process.env.JWT_PRIVATEKEY);
        
        if(!decodedToken){
            return res.status(401).json({error: "Unauthorized Access: Invalid Token" });
        }
        const user = await User.findById(decodedToken.userId).select("-password");
        if(!user){
            return res.status(401).json({error: "Unauthorized Access: User does not exist" });
        }
        req.user =user; 

        next();
    } catch (error) {
        console.log("Error in middleware/protectRoute: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export default protectRoute; 