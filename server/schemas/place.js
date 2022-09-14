const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Place = new Schema({
    placeType: String,
    email_address: String,
    password: String,
    bio: String,
    place_id: String,
    placeName: String,
    address: [{StreetName: String, city: String, country: String}]
});

module.exports = mongoose.model('Place', Place);
