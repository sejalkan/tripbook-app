const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    likes: Number,
    post_id: String,
    description: String,
    user: Schema.Types.ObjectId, ref: "user",
    place: Schema.Types.ObjectId, ref: "Place"
});

module.exports = mongoose.model("post", postSchema);