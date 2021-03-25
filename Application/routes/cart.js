const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart");
const {checkLogin} = require("../middleware/logged");


router.post("/add-to-cart", checkLogin, CartController.addCryptoToCart);
router.delete("/delete/:code", checkLogin, CartController.deleteByCode);
router.get("/", checkLogin, CartController.getCart);
module.exports = router;