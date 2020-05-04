var express = require("express");
var router = express.Router();

const transactionsController = require("../controllers/transactions.controller");

router.get("/", transactionsController.index);

router.post("/create", transactionsController.createCart);

router.get("/:id/complete", transactionsController.complete);

module.exports = router;
