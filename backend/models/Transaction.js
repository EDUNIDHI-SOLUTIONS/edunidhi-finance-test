import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    feeOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FeeOrder',
      required: true
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    paymentId: { type: String, required: true },
    signature: { type: String },
    status: {
      type: String,
      enum: ['created', 'authorized', 'captured', 'failed', 'refunded'],
      default: 'created'
    },
    amount: { type: Number, required: true },
    method: { type: String },
    email: { type: String },
    contact: { type: String },
    metadata: {
      type: Map,
      of: String
    }
  },
  { timestamps: true }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
