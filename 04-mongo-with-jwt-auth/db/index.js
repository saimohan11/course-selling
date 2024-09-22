const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('Your-mongodb-url');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:{
        type:String,
        required:true
        },
    password:{
        type:String,
        required:true,},

        purchasedCourses:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Course'
            }
        ]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    description:String,
    price:Number,
    image:String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}