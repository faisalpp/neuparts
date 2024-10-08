import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    country: {type: String, required:true},
    phone: {type: String, required:true},
    email: {type: String, required:true,unique:true},
    password: {type: String, required:true},
    forget_token: {type: String},
},{timestamps: true});

const User = mongoose.models.Users || mongoose.model('Users',usersSchema,'users');

export default User;