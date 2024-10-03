import mongoose from 'mongoose';

const SubCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const subCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', SubCategorySchema, 'subCategories');

export default subCategory
