import express from 'express';
const router = express.Router();
import CryptoController from '../controllers/cryptocurrency';

router.get("/cryptos/:code", CryptoController.getProductByCode);
router.get("/cryptos",CryptoController.getCryptoCurrencies);
router.post("/add-crypto",CryptoController.addCrypto);
export default router;