const mongoose = require('mongoose')

const staticVideosSchema = new mongoose.Schema({
    url : {type: String, required:true},
    pages: {type: [String], required:false},
},{timestamps: true});

const StaticVideos = mongoose.models.StaticVideos || mongoose.model('StaticVideos',staticVideosSchema);

export default StaticVideos;