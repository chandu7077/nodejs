const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
// import {getPayments} from '../controllers/admin';

router.get("/payments",adminController.getPayments);

module.exports = router;