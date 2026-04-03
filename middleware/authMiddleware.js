const jwt =require("jsonwebtoken");
const User= require("../models/User");

const protect= async (req,res,next)=>{
    const token= req.headers.authorization;
    if(!token) return res.send("No token");
    
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user= await User.findById(decoded.id);
        if(!user) return res.status(401).send("User Not found");
        req.user=user;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = protect