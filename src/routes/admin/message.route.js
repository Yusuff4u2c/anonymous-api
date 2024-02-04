const express = require("express");
const router = express.Router();
const MessageController = require("../../controllers/admin/message.controller");

router.get("/", MessageController.index);
router.get("/:user_id", MessageController.show);
module.exports = router;
