const express=require("express");
const http=require("http")
const {Server}=require("socket.io") 

const app=express()
const server=http.createServer(app) 

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173",
            "https://frontend-chat-app-ipcs.onrender.com"
        ],
        credentials:true
    },
})



const userSocketMap={};

function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

io.on("connection",(socket)=>{
    console.log("user connected");
    const userId=socket.handshake.query.userId
    if(userId){
        userSocketMap[userId]=socket.id;
    }
    
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log("a user disconnected",socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

module.exports={io,app,server,getReceiverSocketId}