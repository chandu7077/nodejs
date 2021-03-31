import express from 'express';
const router = express.Router();
import userController from '../controllers/users';

router.post("/choose-payment",userController.choosePayment);

export default router;