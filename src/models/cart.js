const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Category schema (embedded in CartItem)
const CategorySchema = new Schema({
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Category' // Reference to the Category model
    },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String, // URL or path to the image
      required: true
    }
  }, { _id: false }); // Disable _id for embedded documents

// Define the CartItem schema
const CartItemSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  sale_price: {
    type: String,
    required: true
  },
  regular_price: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  category:[CategorySchema]  
}, { _id: false }); // Disable _id for embedded documents

// Define the Cart schema with timestamps option
const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  items: [CartItemSchema]
}, { timestamps: true }); // Enable automatic timestamps

// Create and export the Cart model
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
