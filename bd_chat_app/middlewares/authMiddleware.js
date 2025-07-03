const jwt=require("jsonwebtoken")
const User=require("../models/Usermodel")

const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            return res.status(400).json({message:"token not found"})
        }
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(400).json({message:"invalid token"})
        }
        const user=await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(400).json({message:"useer not found in the db during token authorization"})
        }
        req.user=user;//Saves the user on the request so next middleware/routes can access it.
        next();
    } catch (error) {
        console.log("error in detection of token during middleware")
        console.log(error.message)
        res.status(500).json({message:"internal server error"})
    }
}

module.exports={protectRoute}