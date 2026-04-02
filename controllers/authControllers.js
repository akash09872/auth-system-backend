const User=require("../models/User");
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')

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
    
    const user= User.findOne({email});
    if(!user) res.send("Invalid Credentials");

    const valid= await bcrypt.compare(password, user.password);
    if(!valid) res.send("Invalid Credentials");

    const token =jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.json({token});
}