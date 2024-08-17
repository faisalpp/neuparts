const mongoose = require('mongoose');

const applianceCategoriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: false },
    slug: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Applianceategories || mongoose.model('ApplianceCategories', applianceCategoriesSchema);
