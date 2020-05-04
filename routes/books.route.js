var express = require("express");
var router = express.Router();

const booksController = require("../controllers/books.controller");

router.get("/", booksController.index);

router.get("/search", booksController.search);

router.get("/create", booksController.create);

router.get("/:id", booksController.view);

router.get("/:id/edit", booksController.edit);

router.get("/:id/delete", booksController.delete);

router.post("/create", booksController.postCreate);

router.post("/edit", booksController.postEdit);

module.exports = router;
