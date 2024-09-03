import mongoose from 'mongoose'

const postsSchema = new mongoose.Schema({
    postType : {type: String, required:true},
    category: {type: String, required:false},
    title:{type: String,required:true},
    slug:{type: String,required:false},
    content:{type: String,required:true},
    thumbnail:{type: String,required:false},
    meta: {type: Object, required:false},
},{timestamps: true});

const Post = mongoose.models.Posts || mongoose.model('Posts',postsSchema,'posts');

export default Post;