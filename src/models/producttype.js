import mongoose from 'mongoose';

const ProductTyoeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.ProductTyoe || mongoose.model('ProductTyoe', ProductTyoeSchema, 'productTypes');
