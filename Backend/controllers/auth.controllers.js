import bcrypt from "bcryptjs"; //importing encrypting library to hash the password
import User from '../models/userModel.js';// importthe user schema to actually build the user model
import generateTokenCookie from '../utilities/generateJWT.js' //import jwt
//authentication controllers 

//signup
export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmedPassword, gender} = req.body; 

        //verifying a unique username & making sure pass==confirmPass
        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({error:"Username already exists"})
        }
        if (password !== confirmedPassword){
            return res.status(400).json({error: "Password does not match"})
        } 
        const profilePic = `https://avatar.iran.liara.run/username?username=${fullName}`

        //securing the password by hashing it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating the new user object
        const newUser = new User ({
            fullName, username, password: hashedPassword, gender, profilePic,
        });

        if(newUser){
            //Creating a JWT Token for authentication
            generateTokenCookie(newUser._id, res);  
            await newUser.save();

            //reposnse (postman)
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            })
        }
        else{
            res.status(400).json({error: "Invalid User Data"});
        }
    } catch (error) {
         res.status(500).json({error: "internal error"})
         console.log("error in auth.controller/signup", error.message)
    }
}

//login
export const login = async (req, res) => {
    try {
        //verifying username & password
        const{username, password} = req.body;
        const user = await User.findOne({username});
        const passwordVerify = await bcrypt.compare(password, user?.password || "");
        if(!user || !passwordVerify){
            return res.status(400).json({error: "Invalid Username or Password"})
        }
        generateTokenCookie(user._id, res);

        //response
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })

    } catch (error) {
        res.status(500).json({error: "Internal error"})
        console.log("error in auth.controller/login", error.message);
    }
}

//logout
export const logout = (req, res) => {
    try {
        res.cookie("JWT", "", {maxAge:0}); //clear the cookies
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        res.status(500).json({error: "Internal error"})
        console.log("error in auth.controller/login", error.message);
   
    }
}
  