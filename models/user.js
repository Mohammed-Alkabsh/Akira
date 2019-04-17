var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: String
});

userSchema.plugin(passportLocalMongoose);

var User = new mongoose.model("User", userSchema);

module.exports = User;