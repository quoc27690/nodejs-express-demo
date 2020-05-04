var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
  title: String,
  description: String,
});

var Book = mongoose.model("Book", bookSchema, "books"); // 'books': lưu vào collection users

module.exports = Book;
