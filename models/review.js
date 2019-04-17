var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        email: String,
    },
    stars: {
        number: Number
    }
});

var Review = mongoose.model("Review", reviewSchema);

module.exports = Review;