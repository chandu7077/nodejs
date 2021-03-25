const User = require("../models/user");
var _ = require('lodash');
const Cart = require("../models/cart");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');
dotenv.config();

exports.login = async (request,response,next) => {
    const {email,password} = request.body;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const user = await User.findOne({where:{email:email}});
    if(user) {
        const valid = await bcrypt.compare(password,user.password);
        if(valid) {
            request.session.user = user.dataValues;
            request.session.isLoggedIn = true;
            const token = jwt.sign({email:email}, process.env.TOKEN_SECRET, { expiresIn: '2592000s' })
            response.send({response:"LogIn Success",token:token});
        }
        else {
            response.status(400).send("Bad Request");
        }
    }
}

exports.resetPasswordToken = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const token = jwt.sign({email:req.params.email}, process.env.TOKEN_SECRET, { expiresIn: '180s' })
    res.send({email:req.params.email,token:token});
}

exports.resetPassword = async (req,res,next) => {

    const {email,newPassword,token} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (token == null) return res.sendStatus(401);
    try{
    const decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);
    jwt.verify(token, process.env.TOKEN_SECRET , async (err, user) => {
        if (err) return res.sendStatus(403);
        if(!_.isEqual(decodedToken.email,email)) return res.sendStatus(401);
        user = await User.findOne({where:{email:email}});
        if(user) {
            hashedPassword = await bcrypt.hash(newPassword,12);
            await user.update({password:hashedPassword});
            res.json("Password Reset Successful");
        }
        else {
            res.json("User not found");
        }

    })
}
catch(err) {
    res.json(err);
}

}

exports.logout = async (request,response,next) => {

    await request.session.destroy();
    request.session = null;
    response.json({response:"logged out"});

}

exports.signUp = async (request,response,next) => {

    const user = {...request.body};
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const exist = await User.findOne({where:{email:user.email}});
    if(exist)
        response.send("User with email already exists");

    else {
        user.password = await bcrypt.hash(user.password,12);
        const resp = await User.create(user);
        const cart = await Cart.create({totalPrice:0.00,userId:resp.id});
        if(resp.id)
            response.send("Signup Successful");
    }
}
