import mongoose from 'mongoose';

const NeulinkSchema = new mongoose.Schema(
  {
    token: { type: String , required:true },
    valid_until: { type: String, required: true },
    updated_after: {type: String}
  },
  { timestamps: true }
);

export default mongoose.models.Neulink || mongoose.model('Neulink', NeulinkSchema);
