const asyncHandler = require('express-async-handler');
const Users = require('../Models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = asyncHandler(async(req,res)=>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        throw new Error('Enter all fields');
    }
    const already_an_user = await Users.findOne({email});
    if(already_an_user){
        res.status(400);
        throw new Error('User already exists with this email id')
    }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const new_user = await Users.create({name, email, password:hashedPassword});
    res.json({
        user:{
            id: new_user.id,
            name: new_user.name,
            email: new_user.email,
            token:generateToken(new_user.id),
        }
    })
});

const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;
    const user = await Users.findOne({email});
    if(!user){
        res.status(400);
        throw new Error('User with this email does not exist')
    }

    const matched = await bcrypt.compare(password, user.password);

    if(!matched){
        res.status(400);
        throw new Error('Incorrect Password')
    }
    res.json({
        user:{
            id: user.id,
            email: user.email,
            token:generateToken(user.id)
        }
    })
});

const userProfile = asyncHandler(async(req,res)=>{
    res.send('user profile');
});

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'30d'})
}

module.exports = {registerUser, loginUser, userProfile}
