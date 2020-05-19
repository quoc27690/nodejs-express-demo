var express = require("express");
var router = express.Router();

const exchangeController = require("../controllers/exchange.controller");

router.get("/", exchangeController.getValue);

module.exports = router;
