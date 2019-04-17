var mongoose = require("mongoose");
var Review = require("./review");

var foodSchema = new mongoose.Schema({
    title: {type: String, required: true},
    type: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    reviews: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Review"
      }
    ]
});

var Food = new mongoose.model("Food", foodSchema);

module.exports = Food;