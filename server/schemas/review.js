const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: Number,
    text: String,
    userName: String,
    user: {type: Schema.Types.ObjectId, ref: 'users'},
    post: {type: Schema.Types.ObjectId, ref: 'posts'},

});

module.exports = mongoose.model('reviews', reviewSchema);