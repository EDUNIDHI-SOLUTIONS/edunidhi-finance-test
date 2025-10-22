import mongoose from 'mongoose';

const guardianSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String }
  },
  { _id: false }
);

const feeBreakupSchema = new mongoose.Schema(
  {
    component: { type: String, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date }
  },
  { _id: false }
);

const studentSchema = new mongoose.Schema(
  {
    admissionNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    class: { type: String, required: true },
    section: { type: String },
    guardians: [guardianSchema],
    dues: {
      total: { type: Number, default: 0 },
      pending: { type: Number, default: 0 },
      lastUpdated: { type: Date, default: Date.now }
    },
    feeBreakup: [feeBreakupSchema],
    concessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Concession'
      }
    ],
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
      }
    ]
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
