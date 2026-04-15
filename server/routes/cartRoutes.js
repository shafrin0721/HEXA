import { Router } from 'express';
import { getCartItems } from '../controllers/cartController.js';

const router = Router();

router.get('/', getCartItems);

export default router;
