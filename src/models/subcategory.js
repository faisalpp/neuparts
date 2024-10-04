import mongoose from 'mongoose';

const SubCategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },{ timestamps: true });

const subcategories = mongoose.models.SubCategories || mongoose.model('SubCategories', SubCategorySchema, 'subCategories');

export default subcategories