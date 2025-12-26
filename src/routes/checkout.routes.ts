import { Router } from 'express';
import { CheckoutController } from '../controllers/checkout.controller.js';

const router = Router();

router.post('/process', CheckoutController.processCheckout);
router.post('/payment-session', CheckoutController.createPaymentSession);

export default router;
