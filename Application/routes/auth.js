const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const {checkLogin} = require("../middleware/logged");
const { body, param, validationResult } = require('express-validator');
const {endsWith} = require("lodash/string");

const emailValidator = (object) =>{
    return  object('email')
            .isEmail()
            .withMessage("Please enter a valid email")
            .custom(value => {
                if(!endsWith(value,"@crypto.com")) {
                    throw new Error("Domain in email invalid");
                }
                return true;
            })
}

const passwordValidator = body("password","PLease enter proper password").isAlphanumeric().isLength({min:5});


// ROUTERS

router.post("/login",
    emailValidator(body),
    authController.login
);

router.get("/logout", checkLogin, authController.logout);

router.post("/signup",
    [ 
        emailValidator(body),
        passwordValidator
        
    ],
        authController.signUp
    
    );

router.get("/reset-password-token/:email", 
    [ 
        emailValidator(param)
    ],
    authController.resetPasswordToken);

router.post("/reset-password",
    [ 
        emailValidator(body),
        passwordValidator
        
    ],
    authController.resetPassword);

    
module.exports = router;