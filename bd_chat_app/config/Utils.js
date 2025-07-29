const jwt=require("jsonwebtoken")

const generate_token=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("jwt",token,{
        maxAge:24*7*60*60*1000,
        httpOnly:true,  //XSS attack
        sameSite:'None',  //CSRF attack
        secure:process.env.NODE_ENV!=="DEVELOPMENT",
    });
    
    //Even though the token is already being stored in a cookie via res.cookie(...), you might 
    // still want to return it for flexibility or testing.
    return token
}



module.exports=generate_token;