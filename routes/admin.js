const express = require('express');
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db") 
const router = express.Router();

router.post("/signup",async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username:username,
        password:password
    }) 
    res.json({
        message: 'Admin created successfully'
    });
});

router.post("/courses",adminMiddleware,async (req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const imagelink = req.body.imagelink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title,
        description,
        imagelink,
        price
    })
    res.json({
        msg:"course created successfully",courseId : newCourse._id
    })
});

router.get("/courses",adminMiddleware, async (req,res) =>{
    const courses = await Course.find({})
    res.json({
        courses
    })
})

module.exports = router;