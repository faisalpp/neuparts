const mongoose = require('mongoose')

const homeGallerySchema = new mongoose.Schema({
    url: {type: String, required:true},
},{timestamps: true});

const HomeGallery = mongoose.models.HomeGallery || mongoose.model('HomeGallery',homeGallerySchema);

export default HomeGallery;