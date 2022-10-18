/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true },
    email_address: { type: String },
    password: String,
    bio: String,
    followers: [{ type: Schema.Types.ObjectId, ref: 'userModel' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'posts' }],
    favPosts: [{ type: Schema.Types.ObjectId, ref: 'posts' }],
    profilePicture: String //{data: Buffer, contentType: String }
});
const userModel = mongoose.model('users', userSchema);


module.exports = userModel;