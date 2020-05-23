var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  status: Boolean,
});

var Product = mongoose.model("Product", productSchema, "products"); // 'books': lưu vào collection users

module.exports = Product;
