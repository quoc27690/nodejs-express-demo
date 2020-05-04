var express = require("express");
var router = express.Router();

const transactionsController = require("../controllers/transactions.controller");

router.get("/", transactionsController.index);

module.exports = router;
