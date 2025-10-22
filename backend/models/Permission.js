import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    module: { type: String, required: true },
    canView: { type: Boolean, default: false },
    canEdit: { type: Boolean, default: false },
    canApprove: { type: Boolean, default: false }
  },
  { timestamps: true }
);

permissionSchema.index({ role: 1, module: 1 }, { unique: true });

const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;
