const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    likes: Number,
    //post_id: String,
    description: String,
    reviews: [{type: Schema.Types.ObjectId, ref: 'reviews'}]
    //user: Schema.Types.ObjectId, ref: 'users',
    // place: Schema.Types.ObjectId, referance: 'places',
});

module.exports = mongoose.model('posts', postSchema);