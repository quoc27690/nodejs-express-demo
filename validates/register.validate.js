module.exports.postCreate = (req, res, next) => {
  var errors = [];
  if (!req.body.name) {
    errors.push("Name is required");
  }
  if (req.body.name.length > 15) {
    errors.push("Name must be less than 15 characters");
  }
  if (!req.body.email) {
    errors.push("Email is required");
  }
  if (!req.body.password) {
    errors.push("Password is required");
  }

  // Truyền "values: req.body" để khi enter ko bị mất dữ liệu nhập
  if (errors.length) {
    res.render("auth/register", { errors: errors, values: req.body });
    return;
  }
  next();
};
