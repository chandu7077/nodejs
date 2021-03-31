import express from 'express';
const router = express.Router();
import errorController from '../controllers/error';

router.use(errorController.handle_404);

export default router;