// const userRouter = require("./user.route");
const adminMessageRouter = require("./admin/message.route");
const adminUserRouter = require("./admin/user.route");
const userMessageRouter = require("./user/message.route");
const authRoute = require("./auth.route");
const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();
const emailVerificationRoute = require("./email.verification.route");

router.use("/auth", authRoute);
router.use("/verify/:token", emailVerificationRoute);

router.use("/admin/messages", isAuthenticated, isAdmin, adminMessageRouter);
router.use("/admin/users", isAuthenticated, isAdmin, adminUserRouter);
router.use("/messages", userMessageRouter);
module.exports = router;
