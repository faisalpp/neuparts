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

const Cats = mongoose.models.ApplianceCategories || mongoose.model('ApplianceCategories', applianceCategoriesSchema);

export default Cats 
