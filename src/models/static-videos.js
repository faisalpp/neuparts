import mongoose from 'mongoose'

const staticVideosSchema = new mongoose.Schema({
    url : {type: String, required:true},
    page: {type: String, required:false},
},{timestamps: true});

const StaticVideos = mongoose.models.StaticVideos || mongoose.model('StaticVideos',staticVideosSchema);

export default StaticVideos;