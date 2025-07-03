const express=require("express")
const router=express.Router();
const {signup,login,logout,checkAuth}=require("../controllers/authControllers")
const {protectRoute}=require("../middlewares/authMiddleware")

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)

router.get("/check",protectRoute,checkAuth)

module.exports= router