const mongoose = require('mongoose')

const postCategoriesSchema = new mongoose.Schema({
    title:{type: String, required:true},
    thumbnail:{type:String,required:false},
    postType:{type:String,required:true},
},{timestamps: true});

const PostCategories = mongoose.models.PostCategories || mongoose.model('PostCategories',postCategoriesSchema,'postCategories');

export default PostCategories;