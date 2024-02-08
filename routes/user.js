const express = require('express');
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");
const router = express.Router();

router.post("/signup",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username,
        password
    })
    res.json({
        message:"user created succesfully"
    });
});

router.get("/courses",async (req,res)=>{
    const courses = await Course.find({})
    res.json({
        courses
    })
})

module.exports = router;