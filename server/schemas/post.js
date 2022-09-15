const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    likes: Number,
    description: String,
    reviews: [{type: Schema.Types.ObjectId, ref: 'reviews'}],
    user: {type: Schema.Types.ObjectId, ref: 'users'},
    place: {type: Schema.Types.ObjectId, referance: 'places'},
});

module.exports = mongoose.model('posts', postSchema);