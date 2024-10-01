import Conversation from '../models/conversationModel.js'; 
import Message from '../models/messageModel.js'

export const sendMessage= async (req, res) => {
    try {
        //recieving the message and both users' ids
        const {message} = req.body;
        const {id: receiverId} = req.params
        const senderId = req.user._id; 

        let conversation= await Conversation.findOne({
            users: {$all:[senderId, receiverId]}
        })
        if(!conversation){
            conversation = await Conversation.create({
                users: [senderId, receiverId],
            })
        }
        const newMessage  = new Message({
            senderId,
            receiverId,
            message,
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //saves both at once
        await Promise.all([conversation.save(), newMessage.save()])
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error messgae.controller/sendMessage: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}
export const getMessage= async (req, res) => {
    try {
        const {id:userToChatId}=req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            users: {
                $all: [senderId, userToChatId]
            }
        }).populate("messages"); //gets the actual text instead of refrence

        if(!conversation){
            return res.status(200).json([]);
        }
        const messages = conversation.messages;
  
        res.status(201).json(messages);
    } catch (error) {
        console.log("Error messgae.controller/getMessage: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}
