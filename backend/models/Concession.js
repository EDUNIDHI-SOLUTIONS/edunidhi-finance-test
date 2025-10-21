import mongoose from 'mongoose';

const concessionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    reason: { type: String },
    approvedBy: { type: String },
    validFrom: { type: Date, default: Date.now },
    validTo: { type: Date }
  },
  { timestamps: true }
);

const Concession = mongoose.model('Concession', concessionSchema);

export default Concession;
