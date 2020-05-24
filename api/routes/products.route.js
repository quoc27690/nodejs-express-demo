var express = require("express");
var router = express.Router();

const productsController = require("../controllers/products.controller");

router.get("/", productsController.index);

router.get("/:id", productsController.getId);

router.post("/", productsController.create);

module.exports = router;
