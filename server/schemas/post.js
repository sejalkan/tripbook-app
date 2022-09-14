const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    likes: Number,
    post_id: String,
    description: String,
    user: Schema.Types.ObjectId, ref: "users",
    place: Schema.Types.ObjectId, ref: "places"
});

module.exports = mongoose.model("posts", postSchema);