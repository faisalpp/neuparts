import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    regular_price: { type: Number, required: true },
    sale_price: { type: Number, required: true },
    part_number: { type: String, required: true },
    is_sale: { type: Boolean, required: true },
    model_no: { type: String, required: true },
    condition: { type: String, required: true },
    type: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory',
    },
    parttype: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductTyoe',
    },
    stock: { type: Number, required: true },
    images: { type: Array, required: true },
    threesixty: { type: String, required: true },
    description: { type: String, required: true },
    specification: { type: String, required: true },
    delivery: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
