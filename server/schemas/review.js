const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: Number,
    text: String,
    review_id: String,
    user: Schema.Types.ObjectId, ref: "user"

});

module.exports = mongoose.model("review", reviewSchema);