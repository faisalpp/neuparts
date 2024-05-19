const mongoose = require('mongoose')

const zipCodeSchema = new mongoose.Schema({
    zipCode: {type: String, required:true,unique:true},
    cords: {type: String, required:true},
    raw: {type: String, required:true},
    country: {type: String},
    city: {type: String},
    state: {type: String},
    zoom: {type: Number,default:10},
},{timestamps: true});

const ZipCode = mongoose.models.ZipCodes || mongoose.model('ZipCodes',zipCodeSchema,'zipCodes');

export default ZipCode;