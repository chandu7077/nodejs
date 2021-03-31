const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transaction");
const Transaction = require("../models/transaction");
const {checkLogin} = require("../middleware/logged");

router.get("/create/:paymentMode",checkLogin,TransactionController.createTransaction);
router.get("/:page",checkLogin,TransactionController.fetchAllTransactions);
module.exports = router;