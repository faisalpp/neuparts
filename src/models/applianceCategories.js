import mongoose from 'mongoose'

const applianceCategoriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: false },
    slug: { type: String, required: false },
    index: { type: Number, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.ApplianceCategories || mongoose.model('ApplianceCategories', applianceCategoriesSchema);
