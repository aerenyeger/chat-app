const express=require("express")
const dotenv=require("dotenv")
const cookieParser = require("cookie-parser")
const{app,server}=require("./config/Socket")
const cors=require("cors")
const connectDB=require("./config/ConnectDb")
const authRoutes=require("./routes/authRoutes")
const messageRoutes=require("./routes/messageRoutes")

dotenv.config();

const PORT=3000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173",
    "https://frontend-chat-app-ipcs.onrender.com"],
    credentials:true
}));
connectDB()

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

server.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
})