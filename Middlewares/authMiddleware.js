const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');


const Protect = asyncHandler(async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token || token === undefined){
        res.status(400);
        throw new Error('Login to proceed');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        res.status(400);
        throw new Error('User Not Authorized!!');
    }
    req.user = await User.findById(decoded.id).select('-password');
    next();
});

const isAdmin = asyncHandler(async(req,res,next)=>{
    if(req.user && req.user.role==="Admin"){
        next();
    }else{
        res.status(400);
        throw new Error('Access Denied!!!');
    }
})

module.exports = {Protect, isAdmin};