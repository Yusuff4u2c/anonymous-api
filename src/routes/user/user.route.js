const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user/user.controller");

router.get("/:username", UserController.show);

module.exports = router;
