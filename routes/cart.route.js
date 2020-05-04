var express = require("express");
var router = express.Router();

const cartController = require("../controllers/cart.controller");

router.get("/add/:bookId", cartController.addToCart);

module.exports = router;
