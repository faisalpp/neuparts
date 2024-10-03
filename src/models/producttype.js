import mongoose from 'mongoose';

const ProductTypeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.ProductType || mongoose.model('ProductType', ProductTypeSchema, 'productTypes');
