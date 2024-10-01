import User from "../models/userModel.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredAllUsers= await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredAllUsers);

    } catch (error) {
        console.error("Error user.controller/getUsersForSidebar ", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}