import mongoose from 'mongoose'

const ConditionsSchema = new mongoose.Schema(
  {
    title: { type: String },
    slug: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.ProductConditions || mongoose.model('ProductConditions', ConditionsSchema, 'productConditions');