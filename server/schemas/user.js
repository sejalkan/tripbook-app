/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email_address: String,
    password: String,
    bio: String,
    followers: [{ type: Schema.Types.ObjectId, ref: 'userModel'}],
    posts: [{type: Schema.Types.ObjectId, ref:'posts'}],
});
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;