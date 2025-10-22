import crypto from 'crypto';
import Razorpay from 'razorpay';
import Student from '../models/Student.js';
import Transaction from '../models/Transaction.js';
import { buildFeeOrderPayload, hydrateFeeOrder, markFeeOrderPaid } from '../utils/feeOrderEngine.js';

const getClient = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Missing Razorpay credentials');
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
};

export const createOrder = async (req, res, next) => {
  try {
    const { studentId, amount, feeBreakup = [], notes = {} } = req.body;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const client = getClient();
    const orderPayload = buildFeeOrderPayload(student, amount, notes);
    const order = await client.orders.create(orderPayload);
    const feeOrder = await hydrateFeeOrder({ studentId, orderResponse: order, feeBreakup });

    res.status(201).json({ order, feeOrder });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const transaction = await Transaction.create({
      feeOrder: req.body.feeOrderId,
      student: req.body.studentId,
      paymentId,
      signature,
      amount: req.body.amount,
      status: 'captured',
      method: req.body.method,
      email: req.body.email,
      contact: req.body.contact,
      metadata: req.body.metadata
    });

    await markFeeOrderPaid({ orderId, transactionId: transaction._id });

    res.json({ verified: true, transaction });
  } catch (error) {
    next(error);
  }
};

export const handleWebhook = async (req, res, next) => {
  try {
    const secret = process.env.RAZORPAY_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    const payload = req.body instanceof Buffer ? req.body.toString() : JSON.stringify(req.body);

    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    if (expected !== signature) {
      return res.status(400).json({ message: 'Invalid webhook signature' });
    }

    const eventPayload = JSON.parse(payload);
    const event = eventPayload?.event;

    if (event === 'payment.captured') {
      const payment = eventPayload.payload.payment.entity;
      await Transaction.findOneAndUpdate(
        { paymentId: payment.id },
        {
          status: 'captured',
          amount: payment.amount / 100,
          method: payment.method,
          email: payment.email,
          contact: payment.contact
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      await markFeeOrderPaid({ orderId: payment.order_id });
    }

    res.json({ received: true });
  } catch (error) {
    next(error);
  }
};

export default {
  createOrder,
  verifyPayment,
  handleWebhook
};
