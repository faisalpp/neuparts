import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    is_variant: { type: Boolean, required: true },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    title: { type: String, required: true },
    regular_price: { type: Number, required: true },
    sale_price: { type: Number, required: true },
    sku: { type: String, required: true },
    part_number: { type: String, required: true },
    model_no: { type: [String], required: true },
    menufacturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductMenufacturer',
    },
    is_sale: { type: Boolean, required: true },
    condition: { type: String },
    type: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory',
    },
    parttype: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductType',
    },
    stock: { type: Number, required: true },
    images: { type: Array },
    thumbnail: { type: String },
    threesixty: { type: String },
    description: { type: String },
    specification: { type: String },
    delivery: { type: String },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
