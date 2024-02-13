const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user/user.controller");

router.get("/:user_id", UserController.show);

module.exports = router;
