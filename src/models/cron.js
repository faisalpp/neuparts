import mongoose from 'mongoose'

const CronsSchema = new mongoose.Schema(
  {
    msg: { type: String ,required:true},
    body: { type: String ,required:true},
    status: { type: Boolean,required:true },
  },
  { timestamps: true }
);

export default mongoose.models.Crons || mongoose.model('Crons', CronsSchema, 'crons');
