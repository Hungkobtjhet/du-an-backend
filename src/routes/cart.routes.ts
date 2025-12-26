import { Router } from 'express';
import { CartController } from '../controllers/cart.controller.js';

const router = Router();

router.get('/', CartController.getCart);
router.post('/add', CartController.addToCart);
router.post('/remove', CartController.removeFromCart);
router.post('/clear', CartController.clearCart);
router.post('/update', CartController.updateQuantity);

export default router;
