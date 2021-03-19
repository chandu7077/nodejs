const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart");

router.post("/add-to-cart",CartController.addCryptoToCart);
router.delete("/delete/:code",CartController.deleteByCode);
router.get("/",CartController.getCart);
module.exports = router;