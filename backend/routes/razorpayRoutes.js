import { Router } from 'express';
import { createOrder, verifyPayment, handleWebhook } from '../controllers/razorpayController.js';

const router = Router();

router.post('/orders', createOrder);
router.post('/verify', verifyPayment);
router.post('/webhook', handleWebhook);

export default router;
