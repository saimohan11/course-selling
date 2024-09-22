const { User } = require("../db")
const jwt = require("jsonwebtoken");
const jwtpass = "secret";

// Middleware for handling auth
function userMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwttoken = words[1];
    const decoded = jwt.verify(jwttoken,jwtpass);
    if(decoded.username){
        req.username = decoded.username;
        console.log(req.username);
        next()
    } else {
        res.status(401).json({
            msg:"Unauthorized"
        });
    }
}

module.exports = userMiddleware;