const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    order_no : {type: String, required:true},
    items : {type: [Object], required:true},
    coupons: {type: [String], required:true},
    billing_address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
    shipping_address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
    sub_total: {type: String, required:true},
    vat: {type: String, required:true},
    grand_total: {type: String, required:true},
    payment_intent: {type: Object},
    order_status: {type: String, required:true},
    payment_status: {type: String, required:true}
},{timestamps: true});

const Order = mongoose.models.Orders || mongoose.model('Orders',ordersSchema,'orders');

export default Order;