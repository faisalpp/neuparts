const mongoose = require('mongoose')

const ProductTypeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.ProductType || mongoose.model('ProductType', ProductTypeSchema, 'productTypes');
