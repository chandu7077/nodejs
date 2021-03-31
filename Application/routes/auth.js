const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const {checkLogin} = require("../middleware/logged");
const { body, param, validationResult } = require('express-validator');
const {endsWith} = require("lodash/string");

const emailValidator = (object) =>{
    return  object('email')
            .exists()
            .isEmail()
            .withMessage("Please enter a valid email")
            .toLowerCase()
            .custom(value => {
                if(!endsWith(value,"@crypto.com")) {
                    throw new Error("Domain in email invalid");
                }
                return true;
            });
            
}

const passwordValidator = body("password","Please enter proper password").isAlphanumeric().isLength({min:5});


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
        body("newPassword","Please enter proper password").exists().isAlphanumeric().isLength({min:5}),
        body("token","Provide token").exists()
        
    ],
    authController.resetPassword);


module.exports = router;