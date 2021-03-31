import express from 'express';
const router = express.Router();
import adminController from '../controllers/admin';

router.get("/payments",adminController.getPayments);

export default router;