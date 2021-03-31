import express from 'express';
const router = express.Router();
import CartController from '../controllers/cart';

router.post("/add-to-cart",CartController.addCryptoToCart);
router.delete("/delete/:code",CartController.deleteByCode);
router.get("/",CartController.getCart);
export default router;