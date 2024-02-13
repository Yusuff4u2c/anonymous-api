const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.delete("/logout", AuthController.logout);
router.post("/verify-email/:token", AuthController.verifyEmail);
router.post("/update-email", AuthController.UpdateEmail);
router.post("/update-password", AuthController.UpdatePassword);
module.exports = router;
