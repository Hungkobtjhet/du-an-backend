import { Router } from 'express';
import { WebhookController } from '../controllers/webhook.controller.js';
import express from 'express';

const router = Router();

// Stripe needs raw body for signature verification
router.post('/stripe', express.raw({ type: 'application/json' }), WebhookController.handleStripe);

export default router;
