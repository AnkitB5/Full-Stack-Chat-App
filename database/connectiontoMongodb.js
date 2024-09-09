import mongoose from "mongoose";

//connection to mongose and error message
const connectToMongoDB =  async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URI);
        console.log("mongodb connected")
    } catch (error) {
        console.log("Error connecting to Mongo Database", error.message)
    } 
}
 
export default connectToMongoDB; 