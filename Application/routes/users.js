const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.post("/choose-payment",userController.choosePayment);

module.exports = router;