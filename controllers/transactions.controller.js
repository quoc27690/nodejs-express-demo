var Transaction = require("../models/transaction.model");
var Book = require("../models/book.model");
var User = require("../models/user.model");
var Session = require("../models/session.model");

module.exports.index = async (req, res) => {
  var transactions = await Transaction.find();
  var books = await Book.find();
  var users = await User.find();

  // Lấy số trang về
  var page = parseInt(req.query.page) || 1; // n
  var perPage = 6; // x
  var numberPage = Math.ceil(transactions.length / perPage);
  var start = (page - 1) * perPage;
  var end = page * perPage;

  if (res.locals.user.isAdmin === "true") {
    var changeTrans = transactions.map((trans) => {
      var book = books.find((book) => book.id === trans.bookId.toString());
      var user = users.find((user) => user.id === trans.userId.toString());
      return {
        bookTitle: book.title,
        userName: user.name,
        id: trans.id,
        isComplete: trans.isComplete,
      };
    });

    res.render("transactions/index", {
      transactions: changeTrans.slice(start, end),
      page,
      numberPage,
      books,
      users,
    });

    return;
  }

  var memberTrans = transactions.filter((trans) => {
    return trans.userId.toString() === res.locals.user.id;
  });

  var changeTrans = memberTrans.map((trans) => {
    var book = books.find((book) => book.id === trans.bookId.toString());

    return {
      bookTitle: book.title,
      userName: res.locals.user.name,
      id: trans.id,
      isComplete: trans.isComplete,
    };
  });

  res.render("transactions/index", {
    transactions: changeTrans.slice(start, end),
    page,
    numberPage,
    books,
    users: res.locals.user,
  });
};

module.exports.createCart = async (req, res) => {
  var session = await Session.findById(req.signedCookies.sessionId);

  if (session) {
    for (var book of session.cart) {
      for (var i = 0; i < book.quantity; i++) {
        await Transaction.create({
          bookId: book.bookId,
          userId: req.signedCookies.userId,
        });
      }
    }
    session.cart = [];
    session.save();

    res.redirect("/transactions");
    return;
  }
};

module.exports.complete = async (req, res) => {
  var id = req.params.id;

  await Transaction.findByIdAndUpdate(id, { isComplete: true });

  res.redirect("back");
};
