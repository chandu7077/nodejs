const express = require("express");
const router = express.Router();
const CryptoController = require("../controllers/cryptocurrency");
const CryptoCurrency = require("../models/cryptocurrency");
const {checkLogin,checkAdminLogin} = require("../middleware/logged");
const { body, param, validationResult } = require('express-validator');
const {endsWith, startsWith} = require("lodash/string");

const codeValidator = (object,opt=false) => {
    return object("code","Max code length is 3")
           .optional(opt)
           .trim()
           .isLength({max:3})
           .toUpperCase();
}

const nameValidator = (object,opt=false) => {
    return object("name","name cannot be empty")
           .optional(opt)
           .trim()
           .isLength({min:1})
}

const changeValidator = (object,opt=false) => {
    return object("change")
           .optional(opt)
           .trim()
           .isLength({min:6,max:6})
           .custom(value => {
               if((startsWith(value,'-') || startsWith(value,'+')) && endsWith(value,'%'))
               return true
               else
               throw new Error("Invalid change format (ex:-0.72% or +0.77%)")
           })
}

const currentPriceValidator = (object,opt=false) => {
    return object("currentPrice","Price should represent number with atmost 4 digits")
           .optional(opt)
           .isDecimal({force_decimal: true, decimal_digits: '1,4',});
}

const closingPriceValidator = (object,opt=false) => {
    return object("closingPrice","Price should represent number with atmost 4 digits")
           .optional(opt)
           .isDecimal({force_decimal: true, decimal_digits: '1,4',});
}

const idValidator = (object) => {

    return object("id").isNumeric();
}

router.get("/cryptos/:code", codeValidator(param),CryptoController.getCryptoByCode);
router.get("/cryptos",CryptoController.getCryptoCurrencies);

router.post("/add-crypto", 
    [   
        codeValidator(body),
        nameValidator(body),
        changeValidator(body),
        currentPriceValidator(body),
        closingPriceValidator(body),
        idValidator(body)
    ],
    checkAdminLogin, CryptoController.addCrypto);

router.put("/edit-crypto", 
    [   
        codeValidator(body,true),
        nameValidator(body,true),
        changeValidator(body,true),
        currentPriceValidator(body,true),
        closingPriceValidator(body,true),
        idValidator(body,true)
    ],
     checkAdminLogin, CryptoController.editCrypto);

router.delete("/delete/:code", codeValidator(param), checkAdminLogin,CryptoController.deleteCryptoByCode);
module.exports = router;