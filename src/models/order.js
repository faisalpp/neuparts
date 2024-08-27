const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    items : {type: [String], required:true},
    coupons: {type: [String], required:true},
    sub_total: {type: String, required:true},
    vat: {type: String, required:true},
    grand_total: {type: String, required:true},
    payment_intant: {type: String, required:true}, 
},{timestamps: true});

const Order = mongoose.models.Orders || mongoose.model('Orders',ordersSchema,'orders');

export default Order;