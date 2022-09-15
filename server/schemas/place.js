const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Place = new Schema({
    placeType: String,
    email_address: String,
    password: String,
    bio: String,
    place_id: String,
    placeName: String,
    address: [{StreetName: String, city: String, country: String}],
    // followers: [{ type: Schema.Types.ObjectId, ref: 'placeModel'}],
    // posts: [{type: Schema.Types.ObjectId, ref:'posts'}],

});
const placeModel = mongoose.model('Place', Place);
module.exports = placeModel;


