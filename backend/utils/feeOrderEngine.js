import FeeOrder from '../models/FeeOrder.js';
import Student from '../models/Student.js';

export const buildFeeOrderPayload = (student, amount, notes = {}) => {
  const receiptId = `EDU-${student.admissionNumber}-${Date.now()}`;

  return {
    amount: Math.round(amount * 100),
    currency: 'INR',
    receipt: receiptId,
    notes: {
      student: student.name,
      admissionNumber: student.admissionNumber,
      ...notes
    }
  };
};

export const hydrateFeeOrder = async ({ studentId, orderResponse, feeBreakup = [] }) => {
  const student = await Student.findById(studentId);

  if (!student) {
    throw new Error('Student not found');
  }

  const feeOrder = await FeeOrder.create({
    student: student._id,
    orderId: orderResponse.id,
    receiptId: orderResponse.receipt,
    amount: orderResponse.amount / 100,
    currency: orderResponse.currency,
    status: orderResponse.status || 'created',
    feeBreakup
  });

  return feeOrder;
};

export const markFeeOrderPaid = async ({ orderId, transactionId }) => {
  const feeOrder = await FeeOrder.findOneAndUpdate(
    { orderId },
    { status: 'paid', $set: { paidAt: new Date(), transactionId } },
    { new: true }
  );

  if (!feeOrder) {
    throw new Error('Fee order not found');
  }

  await Student.findByIdAndUpdate(feeOrder.student, {
    $set: {
      'dues.pending': 0,
      'dues.lastUpdated': new Date()
    }
  });

  return feeOrder;
};

export default {
  buildFeeOrderPayload,
  hydrateFeeOrder,
  markFeeOrderPaid
};
