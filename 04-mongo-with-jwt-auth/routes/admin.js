const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const jwtpass = "secret";

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username,
        password
    })
    res.status(201).json({
        message: "Admin created successfully",
    });
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const admin = await Admin.find({
        username:username,
        password:password
    })
    // console.log(admin);
    if(admin){
        const token = jwt.sign({username:username},jwtpass)
        console.log(token);
        res.status(201).json({
            msg:"token generated successfully",
            token
        })
    } else {
        res.status(401).json({
            msg: "Invalid username or password"
            });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;
    const course = await Course.create({
        title,
        description,
        price,
        image
    })
    console.log(course);
    res.status(201).json({
        message:"course created successfully",
        courseId:course._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const fetchCourses = await Course.find({})
    res.status(200).json({
        message: "Courses fetched successfully",
        courses: fetchCourses
    })
});

module.exports = router;