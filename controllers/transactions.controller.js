const Transaction = require("../models/transaction.model");
const Book = require("../models/book.model");
const User = require("../models/user.model");
const Session = require("../models/session.model");

module.exports.index = async (req, res) => {
  let transactions = await Transaction.find();
  let books = await Book.find();
  let users = await User.find();

  // Lấy số trang về
  let page = parseInt(req.query.page) || 1; // n
  let perPage = 6; // x
  let numberPage = Math.ceil(transactions.length / perPage);
  let start = (page - 1) * perPage;
  let end = page * perPage;

  if (res.locals.user.isAdmin === "true") {
    let changeTrans = transactions.map((trans) => {
      let book = books.find((book) => book.id === trans.bookId.toString());
      let user = users.find((user) => user.id === trans.userId.toString());
      return {
        bookTitle: book.title,
        userName: user && user.name,
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

  let memberTrans = transactions.filter((trans) => {
    return trans.userId.toString() === res.locals.user.id;
  });

  let changeTrans = memberTrans.map((trans) => {
    let book = books.find((book) => book.id === trans.bookId.toString());

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
  let session = await Session.findById(req.signedCookies.sessionId);

  if (session) {
    for (let book of session.cart) {
      for (let i = 0; i < book.quantity; i++) {
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
  let id = req.params.id;

  await Transaction.findByIdAndUpdate(id, { isComplete: true });

  res.redirect("back");
};
