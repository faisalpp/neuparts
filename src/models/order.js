import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
    email: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String, required: true },
    address: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
    postal_code: { type: String, required: true },
    phone: { type: String, required: true },
});

const ordersSchema = new mongoose.Schema({
    user : {type: String},
    order_no : {type: String, required:true},
    items : {type: [Object], required:true},
    coupons: {type: [Object], required:true},
    billing_address: { type: addressSchema, required: true },
    shipping_address: { type: addressSchema, required: true },
    sub_total: {type: String, required:true},
    vat: {type: String, required:true},
    shipping: {type: Object, required:true},
    grand_total: {type: String, required:true},
    payment_intent: {type: Object},
    order_status: {type: String, required:true},
    payment_status: {type: String, required:true}
},{timestamps: true});

const Order = mongoose.models.Orders || mongoose.model('Orders',ordersSchema,'orders');

export default Order;