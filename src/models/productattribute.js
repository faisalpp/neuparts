import mongoose from 'mongoose';

const ProductAttributeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.ProductAttribute || mongoose.model('ProductAttribute', ProductAttributeSchema);
