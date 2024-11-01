import mongoose from 'mongoose';

const ProductManufacturerSchema = new mongoose.Schema(
  {
    title: { type: String,required:true },
    slug: { type: String,required:true,unique:true },
  },
  { timestamps: true }
);

export default mongoose.models.ProductManufacturer || mongoose.model('ProductManufacturer', ProductManufacturerSchema,'productManufacturers');
