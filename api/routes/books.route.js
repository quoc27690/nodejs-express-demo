var express = require("express");
var router = express.Router();

const booksController = require("../controllers/books.controller");

router.get("/", booksController.index);

router.post("/", booksController.create);

module.exports = router;
