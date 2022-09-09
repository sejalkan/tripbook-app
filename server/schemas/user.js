/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    email_address: String,
    password: String,
    bio: String,
});

module.exports = mongoose.model('User', User);
