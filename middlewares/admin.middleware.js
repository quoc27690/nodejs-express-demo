var User = require("../models/user.model");

module.exports.requireAdmin = async (req, res, next) => {
  // Lấy user từ file session.middleware.js
  var user = res.locals.user

  if (user.isAdmin === "false") {
    res.render("auth/login", {
      errors: ["Not Admin's Account. Allow to enter Transactions"],
    });
    return;
  }

  next();
};
