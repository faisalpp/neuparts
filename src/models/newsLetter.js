import mongoose from 'mongoose'

const newsLetterSchema = new mongoose.Schema({
    email: {type: String, required:true,unique:true},
    is_deals: {type: Boolean, required:true,default:true},
    is_news: {type: Boolean, required:true,default:true},
},{timestamps: true});

const NewsLetter = mongoose.models.NewsLetter || mongoose.model('NewsLetter',newsLetterSchema);

export default NewsLetter;