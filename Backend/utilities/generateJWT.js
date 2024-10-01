import JWT from 'jsonwebtoken';

const generateTokenCookie = (userId, res)=>{
    const token = JWT.sign({userId}, process.env.JWT_PRIVATEKEY, {expiresIn:'15d'}); //verifies the private key
    res.cookie("JWT", token,{
        maxAge: 15*24*60*60*100,//generates an experation date
        httpOnly: true, //makes cookie unaccesbile via js
        sameSite: "strict",
        secure: process.env.DEV_STATUS !== "development",
    } ) 
}
export default generateTokenCookie; 