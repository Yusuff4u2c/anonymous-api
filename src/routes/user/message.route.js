const express = require("express");
const router = express.Router();
const MessageController = require("../../controllers/user/message.controller");
const isAuthenticated = require("../../middlewares/isAuthenticated");

router.get("/:user_id", isAuthenticated, MessageController.index);
router.post("/:user_id", MessageController.create);

module.exports = router;
