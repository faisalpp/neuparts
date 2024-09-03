import mongoose from 'mongoose'

const postCategoriesSchema = new mongoose.Schema({
    title:{type: String, required:true},
    thumbnail:{type:String,required:false},
    slug:{type:String,required:false},
    postType:{type:String,required:true},
},{timestamps: true});

export default mongoose.models.PostCategories || mongoose.model('PostCategories',postCategoriesSchema);