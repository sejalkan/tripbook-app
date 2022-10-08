/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique: true},
    email_address: {type: String, unique: true},
    password: String,
    bio: String,
    followers: [{ type: Schema.Types.ObjectId, ref: 'userModel'}],
    posts: [{type: Schema.Types.ObjectId, ref:'posts'}],
    profilePicture: {data: Buffer, contentType: String }
});
const userModel = mongoose.model('users', userSchema);


module.exports = userModel;