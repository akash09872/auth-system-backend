const User=require("../models/User");
const bcrypt = require('bcrypt');   
const jwt= require('jsonwebtoken');
const {generateAccessToken, generateRefreshToken} = require("../utils/generateToken");

exports.signup= async (req,res)=>{
    const {email, password}= req.body;
    const userExists = await User.findOne({email});
    if(userExists) return res.send("User already exists");

    const hashed=await bcrypt.hash(password, 10);
    
    const user= await User.create({email, password: hashed});
    res.json(user);
}

exports.login = async (req,res) => {
    const {email, password} =req.body;
    const user = await User.findOne({email});
    if(!user) res.send("Invalid Credentials");

    const valid= await bcrypt.compare(password, user.password);
    if(!valid) res.send("Invalid Credentials");

    const accessToken= generateAccessToken(user._id);
    const refreshToken= generateRefreshToken(user._id);
    user.refreshToken= refreshToken;
    await user.save();
    res.json({accessToken, refreshToken});
}

exports.refresh = async (req,res) => {
    const {refreshToken} =req.body;
    if(!refreshToken) return res.send("No token");
    try {
        const decoded= jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        
        const user= await User.findById(decoded.id);
        if(user.refreshToken !=refreshToken ){
            res.send("Invalid token");
        }
        const newAccessToken = generateAccessToken(user._id);
        res.json({accessToken: newAccessToken});
    }catch {
        res.send("Expired or Invalid");
    }
}

exports.logout = async (req,res) =>{
    const {refreshToken} = req.body;
    const user= await User.findOne({refreshToken});
    if(user){
        user.refreshToken= null;
        await user.save();
    }
    res.send("Logged out");
};