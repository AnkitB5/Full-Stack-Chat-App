import mongoose, { Schema } from "mongoose";

//blueprint (schema) used to create a user
const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        minlength: 8,
        required: true,
    },
    gender:{
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePic:{
        type: String,
        default: "",
    },
},{timestamps: true});

const User = mongoose.model("User", userSchema);
export default User; 