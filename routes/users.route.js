var express = require("express");
var router = express.Router();

var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })

const usersController = require("../controllers/users.controller");
const usersValidate = require("../validates/users.validate");

router.get("/", usersController.index);

router.get("/search", usersController.search);

router.get("/create", usersController.create);

router.get("/:id/edit", usersController.edit);

router.get("/:id/delete", usersController.delete);

// Trước khi validate thì multer để kiểm tra dữ liệu
router.post("/create",upload.single('avatar'), usersValidate.postCreate, usersController.postCreate);

router.post("/edit", usersController.postEdit);

module.exports = router;
