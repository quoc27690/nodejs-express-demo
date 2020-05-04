var User = require("../models/user.model");

const bcrypt = require("bcrypt");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports.index = async (req, res) => {
  var users = await User.find();

  res.render("users/index", {
    users: users,
  });
};

module.exports.search = async (req, res) => {
  var users = await User.find();

  var q = req.query.q;

  var matchUsers = users.filter(function (user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render("users/index", {
    users: matchUsers,
  });
};

module.exports.create = (req, res) => {
  res.render("users/create");
};
module.exports.postCreate = async (req, res) => {
  let file = await cloudinary.uploader.upload(req.file.path);

  await User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
    avatar: file.url,
    wrongLoginCount: 0,
  });

  res.redirect("/users");
};

module.exports.edit = async (req, res) => {
  var id = req.params.id;

  user = await User.findOne({ _id: id });

  res.render("users/edit", {
    user: user,
  });
};
module.exports.postEdit = async (req, res) => {
  var id = req.body.id;

  await User.findByIdAndUpdate({ _id: id }, { name: req.body.name });

  res.redirect("/users");
};

module.exports.delete = async (req, res) => {
  var id = req.params.id;

  await User.findByIdAndDelete({ _id: id });

  res.redirect("/users");
};
