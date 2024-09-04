import mongoose from 'mongoose'

const CouponsSchema = new mongoose.Schema(
  {
    code: { type: String },
    description: { type: String },
    type: { type: String },
    value: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Coupons || mongoose.model('Coupons', CouponsSchema, 'coupons');
