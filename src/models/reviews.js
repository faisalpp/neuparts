const mongoose = require('mongoose')

const reviewsSchema = new mongoose.Schema({
    name : {type: String, required:true},
    review: {type: String, required:true},
    rating:{type: String,required:false},
    pages: {type: [String], required:false},
},{timestamps: true});

const Review = mongoose.models.Reviews || mongoose.model('Reviews',reviewsSchema,'reviews');

export default Review;