var Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  var products = await Product.find();

  res.json(products);
};

module.exports.getId = async (req, res) => {
  var id = req.params.id;

  product = await Product.findById({ _id: id });

  res.json(product);
};

module.exports.create = async (req, res) => {
  var product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    status: req.body.status,
  });

  res.json(product);
};
