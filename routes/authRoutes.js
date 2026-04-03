const express= require("express");

const {signup, login, refresh ,logout}= require("../controllers/authControllers");

const protect = require("../middleware/authMiddleware");
const router= express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout)
router.get("/profile", protect, (req,res)=>{
    res.json({
        id: req.user._id,
        email: req.user.email
    })
})
router.post("/refresh",refresh);

module.exports = router;