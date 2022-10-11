const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    timestamp: {
        type: String,
        default: Date.now()
    },
    description: String,
    location: String,
    reviews: [{type: Schema.Types.ObjectId, ref: 'reviews'}],
    userName: String,
    place: {type: Schema.Types.ObjectId, referance: 'places'},
});

module.exports = mongoose.model('posts', postSchema);