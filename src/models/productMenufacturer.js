import mongoose from 'mongoose';

const ProductMenufacturerSchema = new mongoose.Schema(
  {
    title: { type: String,required:true },
    slug: { type: String,required:true,unique:true },
  },
  { timestamps: true }
);

export default mongoose.models.ProductMenufacturer || mongoose.model('ProductMenufacturer', ProductMenufacturerSchema,'productMenufacturers');
