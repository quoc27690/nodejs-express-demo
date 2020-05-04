var express = require("express");
var router = express.Router();

const authController = require("../controllers/auth.controller");

router.get("/login", authController.login);

router.post("/login", authController.postLogin);

module.exports = router;
