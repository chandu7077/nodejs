const express = require("express");
const router = express.Router();
const CryptoController = require("../controllers/cryptocurrency");

router.get("/cryptos",CryptoController.getCryptoCurrencies);
router.post("/add-crypto",CryptoController.addCrypto);
module.exports = router;