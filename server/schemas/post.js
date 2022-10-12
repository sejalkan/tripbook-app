const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    timestamp: {
        type: String,
        default: Date.now()
    },
    description: String,
    location: String,
    userName: String,
    reviews: [{type: Schema.Types.ObjectId, ref: 'reviews'}],
    user: [{type: Schema.Types.ObjectId, referance: 'users'}],
    place: [{type: Schema.Types.ObjectId, referance: 'places'}],
});

module.exports = mongoose.model('posts', postSchema);