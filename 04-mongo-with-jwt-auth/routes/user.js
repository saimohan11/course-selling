const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const jwtpass = "secret"

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username,
        password
    })
    res.status(201).json({
        message: "User created successfully"
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({
        username:username,
        password:password
    })
    if(user){
        const token = jwt.sign({username},jwtpass)
        res.status(201).json({
            message: "User logged in successfully",
            token:token
        })
    } else {
        res.status(401).json({
            message: "Invalid username or password"
            })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({})
    console.log(response);
    res.status(200).json({
        message: "Courses listed successfully",
        data:response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const username = req.username; // Ensure this is set by userMiddleware

        // Debugging information
        console.log(`Username: ${username}, Course ID: ${courseId}`);

        // Check if username is defined
        if (!username) {
            return res.status(400).json({ msg: "User not authenticated." });
        }

        // Update the user's purchased courses
        const result = await User.updateOne(
            { username: username },
            { "$push": { purchasedCourses: courseId } }
        );

        // Check if the update was successful
        if (result.nModified === 0) {
            return res.status(404).json({ msg: "Course purchase failed. User may not exist." });
        }

        res.json({ msg: "Purchase Complete!" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ msg: "An error occurred while processing your request." });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username:req.username,
    })
    const course = await Course.find({
        _id:{
            $in:user.purchasedCourses
            }
    })
    res.status(200).json({
        message: "Purchased courses listed successfully",
        data:course
        })
});

module.exports = router