import mongoose from 'mongoose'

const FavoritesSchema = new mongoose.Schema(
  {
   userId:{
    type: String,
    required:true
   }, 
   item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required:true
   },
  },
  { timestamps: true }
);

export default mongoose.models.Favorites || mongoose.model('Favorites', FavoritesSchema, 'favorites');
