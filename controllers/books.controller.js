var Book = require("../models/book.model");

module.exports.index = async (req, res) => {
  var books = await Book.find();

  // Lấy số trang về
  var page = parseInt(req.query.page) || 1; // n
  var perPage = 6; // x
  var numberPage = Math.ceil(books.length / perPage);
  var start = (page - 1) * perPage;
  var end = page * perPage;

  res.render("books/index", {
    books: books.slice(start, end),
    numberPage: numberPage,
    page: page,
  });
};

module.exports.search = async (req, res) => {
  var books = await Book.find();

  var q = req.query.q;
  var matchBooks = books.filter(function (book) {
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("books/index", {
    books: matchBooks,
    q: q,
  });
};

module.exports.create = (req, res) => res.render("books/create");
module.exports.postCreate = async (req, res) => {
  await Book.create({
    title: req.body.title,
    description: req.body.description,
  });

  res.redirect("/books");
};

module.exports.view = async (req, res) => {
  var id = req.params.id;

  book = await Book.findById({ _id: id });

  res.render("books/view", {
    book: book,
  });
};

module.exports.edit = async (req, res) => {
  var id = req.params.id;

  book = await Book.findById({ _id: id });

  res.render("books/edit", {
    book: book,
  });
};
module.exports.postEdit = async (req, res) => {
  var id = req.body.id;

  await Book.findByIdAndUpdate(
    { _id: id },
    { title: req.body.title, description: req.body.description }
  );

  res.redirect("/books");
};

module.exports.delete = async (req, res) => {
  var id = req.params.id;

  await Book.findByIdAndDelete({ _id: id });

  res.redirect("/books");
};
