const mongoose = require('mongoose')

const ProductCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    thumbnail: { type: String, required: true },
    isvisible: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.ProductCategory || mongoose.model('ProductCategory', ProductCategorySchema, 'productCategories');
