const express=require("express")
const router=express.Router()
const{getMessages,sendMessage,getUserForSidebar}=require("../controllers/messageControllers")
const {protectRoute}=require("../middlewares/authMiddleware")

router.get("/users",protectRoute,getUserForSidebar)

router.get("/:id",protectRoute,getMessages)

router.post("/send/:id",protectRoute,sendMessage)

module.exports=router