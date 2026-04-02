const express= require("express");

const {signup, login }= require("../controllers/authControllers");

const protect = require("../middleware/authMiddleware");

const router= express.Router();

router.post("/signup",signup);
router.post("/login",login);

router.get("/profile", protect, (req,res)=>{
    res.send("Protected data");
})

module.exports = router;