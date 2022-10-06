const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
    user_id: {
        type: ObjectId,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        default: Date.now()
    },
    likes: Number,
    description: String,
    reviews: [{type: Schema.Types.ObjectId, ref: 'reviews'}],
    user: {type: Schema.Types.ObjectId, ref: 'users'},
    place: {type: Schema.Types.ObjectId, referance: 'places'},
});

module.exports = mongoose.model('posts', postSchema);