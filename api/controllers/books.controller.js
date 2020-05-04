var Book = require("../../models/book.model");

module.exports.index = async (req, res) => {
  var books = await Book.find();

  res.json(books);
};

module.exports.create = async (req, res) => {
  console.log(req.body)
  var book = await Book.create({
    title: req.body.title,
    description: req.body.description
  });

  res.json(book);
};
