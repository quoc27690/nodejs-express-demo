var express = require("express");
var router = express.Router();

const productsController = require("../controllers/products.controller");

router.get("/", productsController.getIndex);

router.get("/:id", productsController.getId);

router.delete("/:id", productsController.deleteId);

router.put("/:id", productsController.putId);

router.post("/", productsController.postCreate);

module.exports = router;
