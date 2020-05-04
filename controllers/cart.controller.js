const Session = require("../models/session.model.js");

module.exports.addToCart = async (req, res) => {
  let bookId = req.params.bookId;
  let sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect("/books");
  }

  let session = await Session.findById(sessionId);

  let book = session.cart.find(
    cartItem => cartItem.bookId.toString() === bookId
  );

  if (book) {
    book.quantity += 1;
    session.save();
  } else {
    await Session.findByIdAndUpdate(sessionId, {
      $push: { cart: { bookId, quantity: 1 } }
    });
  }

  res.redirect("/books");
};
