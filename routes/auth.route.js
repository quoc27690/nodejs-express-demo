var express = require("express");
var router = express.Router();

var multer = require("multer");
var upload = multer({ dest: "./public/uploads/" });

const authController = require("../controllers/auth.controller");
const registerValidate = require("../validates/register.validate");

router.get("/login", authController.login);

router.post("/login", authController.postLogin);

router.get("/register", authController.register);

router.post(
  "/register",
  upload.single("avatar"),
  registerValidate.postCreate,
  authController.postRegister
);

module.exports = router;
