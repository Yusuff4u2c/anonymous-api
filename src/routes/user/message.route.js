const express = require("express");
const router = express.Router();
const MessageController = require("../../controllers/user/message.controller");
const isAuthenticated = require("../../middlewares/isAuthenticated");

router.get("/:user_id", MessageController.index);
router.post("/:username", MessageController.create);

module.exports = router;
