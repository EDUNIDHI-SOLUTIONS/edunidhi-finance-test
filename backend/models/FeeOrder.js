import mongoose from 'mongoose';

const feeOrderSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    orderId: { type: String, required: true, unique: true },
    receiptId: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['created', 'paid', 'failed', 'refunded'],
      default: 'created'
    },
    feeBreakup: [
      {
        component: String,
        amount: Number
      }
    ],
    notes: {
      type: Map,
      of: String
    },
    expiresAt: { type: Date }
  },
  { timestamps: true }
);

const FeeOrder = mongoose.model('FeeOrder', feeOrderSchema);

export default FeeOrder;
