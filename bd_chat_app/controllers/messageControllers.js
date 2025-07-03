const User = require("../models/Usermodel");

const Message = require("../models/Messagemodel");

const { io, getReceiverSocketId } = require("../config/Socket");

 const getUserForSidebar = async (req,res) => {
  try {
    const loggedInUser=req.user._id;
    const filteredUser=await User.find({_id:{
      $ne:
        loggedInUser
    }}).select("-password")
    res.status(200).json(filteredUser)
  } catch (error) {
    res.status(500).json({message:"internal server error"})
    console.log(error.message)
  }
};


 const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const userId = req.user._id;
    const messages = await Message.find({
      $or: [
        {
          senderId: userToChatId,
          receiverId: userId,
        },
        {
          senderId: userId,
          receiverId: userToChatId,
        },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("error while getting messages");
    res.status(500).json({ message: "internal server error" });
  }
};

 const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    console.log(receiverId)
    console.log(senderId)
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
    });

    await newMessage.save();
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sending message");
    console.log(error.message)
    return res.status(500).json({message:"internal server error"})
  }
};

module.exports={getUserForSidebar,sendMessage,getMessages}

