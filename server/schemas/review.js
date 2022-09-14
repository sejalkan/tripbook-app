const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: Number,
    text: String,
    //_id: String,
    user: {type: Schema.Types.ObjectId, ref: "users"}

});

module.exports = mongoose.model("reviews", reviewSchema);