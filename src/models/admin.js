import mongoose from 'mongoose'

const adminsSchema = new mongoose.Schema({
    email: {type: String, required:true},
    password: {type: String, required:true},
},{timestamps: true});

const Admin = mongoose.models.Admins || mongoose.model('Admins',adminsSchema,'admins');

export default Admin;