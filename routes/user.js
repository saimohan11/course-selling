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
    });
});

router.post("/couses/:courseId",userMiddleware,async (req,res)=>{
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "Purchase complete!"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router;