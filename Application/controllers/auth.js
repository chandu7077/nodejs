const User = require("../models/user");
var _ = require('lodash');
const Cart = require("../models/cart");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');
const BaseError = require("../errors/error.js");
const HttpStatusCode = require("../errors/status");
const {UserNotFoundException,InvalidAccessTokenException} = require("../errors/names");
dotenv.config();

exports.login = async (request,response,next) => {
    const {email,password} = request.body;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const user = await User.findOne({where:{email:email}}).catch(err => next(err));

    if(_.isNil(user)) {

        next(UserNotFoundException);
    }

    else {
        const valid = await bcrypt.compare(password,user.password).catch(err => next(err));

        if(valid) {
            request.session.user = user.dataValues;
            request.session.isLoggedIn = true;
            const token = jwt.sign({email:email}, process.env.TOKEN_SECRET, { expiresIn: '24h' })
            response.json({resp:"LogIn Success",token:token});
        }
        else {
            const error = new BaseError("InvalidUserLogin","Wrong user credentials",HttpStatusCode.BAD_REQUEST);
            next(error);
        }
    }
}

exports.resetPasswordToken = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    user = await User.findOne({where:{email:req.params.email}}).catch(err => next(err));

    if(!_.isNil(user)) {
        const token = jwt.sign({email:req.params.email}, process.env.TOKEN_SECRET, { expiresIn: '180s' })
        res.send({email:req.params.email,token:token});
    }
    else {
        next(UserNotFoundException);
    }
    
}

exports.resetPassword = async (req,res,next) => {

    const {email,newPassword,token} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (_.isNil(token)) {
        next(InvalidAccessTokenException);
    }

    try{
        decodedToken = await jwt.verify(token, process.env.TOKEN_SECRET);
    } 
    catch(err) {
       next(err);
    }

    jwt.verify(token, process.env.TOKEN_SECRET , async (err, user) => {
        if (err) 
            next(err);

        if(!_.isEqual(decodedToken.email,email)) {
            next(InvalidAccessTokenException);
        }

        user = await User.findOne({where:{email:email}}).catch(err => next(err));

        if(user) {
            hashedPassword = await bcrypt.hash(newPassword,12).catch(err => next(err));;
            await user.update({password:hashedPassword}).catch(err => next(err));;
            res.json("Password Reset Successful");
        }

        else {
            next(UserNotFoundException);
        }
    })

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

    if(exist) {
        response.send("User with email already exists");
    }
        

    else {
        user.password = await bcrypt.hash(user.password,12);
        const resp = await User.create(user);
        const cart = await Cart.create({totalPrice:0.00,userId:resp.id});
        if(resp.id)
            response.send("Signup Successful");
    }
}
