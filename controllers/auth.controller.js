var User = require("../models/user.model");

const bcrypt = require("bcrypt");

module.exports.login = (req, res) => res.render("auth/login");

module.exports.postLogin = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var user = await User.findOne({ email: email });

  if (!user) {
    res.render("auth/login", {
      errors: ["User does not exist!"],
      values: req.body,
    });
    return;
  }

  var comparePassword = bcrypt.compareSync(password, user.password);

  if (!comparePassword) {
    await User.findByIdAndUpdate(user.id, {
      wrongLoginCount: (user.wrongLoginCount += 1),
    });
    if (user.wrongLoginCount < 4) {
      res.render("auth/login", {
        errors: [`Wrong password Time: ${user.wrongLoginCount}`],
        values: req.body,
      });
      return;
    }
    if (user.wrongLoginCount >= 4) {
      res.render("auth/login", {
        errors: ["Your account has been locked!"],
        values: req.body,
      });
      return;
    }
  }
  // Reset wrongLoginCount : 0 khi đăng nhập đúng
  await User.findByIdAndUpdate(user.id, {
    wrongLoginCount: 0
  });
  // Tạo cookie userId khi đăng nhập đúng
  res.cookie("userId", user.id, { signed: true });
  res.redirect("/");
};
