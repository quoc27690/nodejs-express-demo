const User = require("../models/user.model.js");
const Session = require("../models/session.model.js");

module.exports = async (req, res, next) => {
  var id = req.signedCookies.userId;

  if (id) {
    let user = await User.findById(id);
    res.locals.user = user;
  }

  if (!id) {
    let newSession = await Session.create({});

    res.cookie("sessionId", newSession.id, {
      signed: true,
    });
  }

  let session = await Session.findById(req.signedCookies.sessionId);

  let count = 0;

  if (session) {
    for (let book of session.cart) {
      count += book.quantity;
    }
  }

  res.locals.count = count;

  next();
};
