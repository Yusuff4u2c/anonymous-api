const express = require("express");
const router = express.Router();
const MessageController = require("../controllers/message.controller");

router.get("/", MessageController.index());
router.get("/id", MessageController.show());
router.post("/", MessageController.create());
router.put("/id", MessageController.update());
router.delete("/id", MessageController.delete());

module.exports = router;
