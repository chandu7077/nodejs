import User from '../models/user.js';
import _ from 'lodash';
import Cart from '../models/cart.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import BaseError from '../errors/error.js';
import HttpStatusCode from '../errors/status.js';
import { UserNotFoundException, InvalidAccessTokenException } from '../errors/names.js';
import { UserAlreadyExistsException } from '../../Application/errors/names.js';
import validator from "validator";
dotenv.config();

export const login = async ({loginData},request) => {
    const {email,password} = loginData;
    const errors = [];
    if(!validator.isEmail(email)) {
        errors.push({message:"Email is Invalid"});
    }

    if(validator.isEmpty(password)) {
        errors.push({message:"Please provide all fields"});
    }

    if(!validator.isLength(password,{min:5})) {
        errors.push({message:"Password is shorter(min length :5)"});
    }

    if(errors.length>0) {
        const error = new Error("Invalid Input");
        error.data = errors;
        error.code = HttpStatusCode.BAD_REQUEST;
        throw error;
    }

    const user = await User.findOne({where:{email:email}}).catch(err => next(err));

    if(_.isNil(user)) {

        throw UserNotFoundException;
    }

    else {
        const valid = await bcrypt.compare(password,user.password).catch(err => next(err));

        if(valid) {
            request.user = user.dataValues;
            request.isLoggedIn = true;
            const token = await jwt.sign({email:email, role:user.dataValues.role}, process.env.TOKEN_SECRET, { expiresIn: '24h' });
            return {email:email,token:token};
        }
        else {

            const error = new BaseError("InvalidUserLogin","Wrong user credentials",HttpStatusCode.BAD_REQUEST);
            throw error;
        }
    }
};

export const resetPasswordToken = async (req,res,next) => {
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
    
};

export const resetPassword = async (req,res,next) => {

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

};

export const logout = async (request,response,next) => {

    await request.session.destroy();
    request.session = null;
    response.json({response:"logged out"});

};

export const signUp = async ({user},request) => {
    const errors = [];
    if(!validator.isEmail(user.email)) {
        errors.push({message:"Email is Invalid"});
    }

    if(validator.isEmpty(user.password) || validator.isEmpty(user.name) || validator.isEmpty(user.role)) {
        errors.push({message:"Please provide all fields"});
    }

    if(!validator.isLength(user.password,{min:5})) {
        errors.push({message:"Password is shorter(min length :5)"});
    }

    if(errors.length>0) {
        const error = new Error("Invalid Input");
        error.data = errors;
        error.code = HttpStatusCode.BAD_REQUEST;
        throw error;
    }

    const exist = await User.findOne({where:{email:user.email}});
  
    if(exist) {
        throw UserAlreadyExistsException;
    }
    
    else {
        user.password = await bcrypt.hash(user.password,12);
        const resp = await User.create(user);
        const cart = await Cart.create({totalPrice:0.00,userId:resp.id});
        if(resp.id)
            return resp;
    }
};
