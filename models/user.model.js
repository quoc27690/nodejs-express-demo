var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: String,
  avatar: String,
  wrongLoginCount: Number,
});

var User = mongoose.model("User", userSchema, "users"); // 'users': lưu vào collection users

module.exports = User;
