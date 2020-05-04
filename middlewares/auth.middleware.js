var User = require("../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  var id = req.signedCookies.userId

  // Nếu chưa có cookie userId thì trả lại trang login
  if (!id) {
    res.redirect("/auth/login");
    return;
  }

  next();
};


