const express= require('express')
const dotenv=require('dotenv')

dotenv.config();

const app=express();

app.use(express.json());

//connecting DB
const connectDB = require("./config/db");
connectDB();

app.get("/", (req,res)=>{
    res.send("API running");
})


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server running on Port: ${PORT}`);
})