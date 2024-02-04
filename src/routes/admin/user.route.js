const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/admin/user.controller");

router.get("/", UserController.index);
router.get("/:user_id", UserController.show);
router.delete("/user_id", UserController.delete);

module.exports = router;
