import mongoose from 'mongoose';

const SubCategprySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.SubCategpry || mongoose.model('SubCategpry', SubCategprySchema, 'subCategpries');
