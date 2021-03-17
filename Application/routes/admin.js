const express = require("express");
const router = express.Router();

const payments = ["COD","UPI","Credit Card","Debit Card","Wallet","Bank Transfer"];
const cryptos = ["Bitcoin","Ethereum","Ripple"];

const getPayments = (request,response,next) => {
    let data={payments,cryptos};
    response.send(data);
}

router.get("/payments",getPayments);

module.exports = router;