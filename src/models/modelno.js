import mongoose from 'mongoose';

const ModelNoSchema = new mongoose.Schema(
  {
    title: { type: String },
    model_no: { type: String, required: true,unique:true },
    thumbnail: { type: String },
    type: { type: String, default:'model_no' },
  },
  { timestamps: true }
);

export default mongoose.models.ModelNo || mongoose.model('ModelNo', ModelNoSchema);
