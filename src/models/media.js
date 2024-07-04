const mongoose = require('mongoose')

const mediasSchema = new mongoose.Schema({
    name : {type: String, required:true},
    url: {type: String, required:true},
    alt:{type: String,required:false},
    type:{type: String,required:false},
    thumbnail:{type: String,required:false},
    attachments: {type: [String], required:false},
},{timestamps: true});

const Media = mongoose.models.Medias || mongoose.model('Medias',mediasSchema,'medias');

export default Media;