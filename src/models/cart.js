import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categories: [
    {
      cat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
      cat_title: String,
      cat_image: String,
      items: [
        {
          id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
          thumbnail: String,
          title: String,
          regular_price: Number,
          sale_price: Number,
          is_sale: Boolean,
          condition: String,
          quantity: Number
        }
      ]
    }
  ]
});


// Create and export the Cart model
export default mongoose.models.Cart || mongoose.model('Cart', CartSchema,'carts');
