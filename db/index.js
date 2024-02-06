import mongoose from "mongoose";

mongoose.connect('mongodb+srv://admin:mohan123@cluster0.q91rfbe.mongodb.net/');

const AdminSchema = new mongoose.Schema({
    username:String,
    password:String
});

const UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    purchasedcourse:[{
        type : mongoose.Schema.Types.ObjectId ,
        ref:'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    title:String,
    description:String,
    imagelink:String,
    price:Number
});


const Admin = mongoose.model( 'Admin', AdminSchema );
const User = mongoose.model( 'User', UserSchema);
const Course = mongoose.model('Course',CourseSchema);

module.exports= {Admin,User,Course};
