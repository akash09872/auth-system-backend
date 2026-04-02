const express= require('express')
const dotenv=require('dotenv')
const authRoutes= require("./routes/authRoutes")
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app=express();
app.use(express.json());
app.use("/api/auth",authRoutes);

app.get("/", (req,res)=>{
    res.send("API running");
})


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server running on Port: ${PORT}`);
})