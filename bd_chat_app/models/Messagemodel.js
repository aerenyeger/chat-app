const mongoose = require("mongoose")
const USer=require("../models/Usermodel")
const MessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String
    }
},
{ timestamps: true }
)

const Message=mongoose.model("Message",MessageSchema)
module.exports= Message;