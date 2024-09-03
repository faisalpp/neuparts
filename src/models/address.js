import mongoose from 'mongoose'

const addressesSchema = new mongoose.Schema({
    user : {type: String},
    email : {type: String, required:true},
    first_name : {type: String, required:true},
    last_name : {type: String, required:true},
    address : {type: String, required:true},
    appartment : {type: String, required:true},
    city : {type: String, required:true},
    province : {type: String, required:true},
    country : {type: String, required:true},
    postal_code : {type: String, required:true},
    phone : {type: String, required:true},
    type : {type: String, required:true}, 
},{timestamps: true});

const Address = mongoose.models.Address || mongoose.model('Address',addressesSchema);

export default Address;