// const userRouter = require("./user.route");
const adminMessageRouter = require("./admin/message.route");
const adminUserRouter = require("./admin/user.route");
const userMessageRouter = require("./user/message.route");
const userUserRouter = require("./user/user.route");
const authRoute = require("./auth.route");
const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.use("/auth", authRoute);
router.use("/admin/messages", isAuthenticated, isAdmin, adminMessageRouter);
router.use("/admin/users", isAuthenticated, isAdmin, adminUserRouter);
router.use("/message", userMessageRouter);
router.use("/user", userUserRouter);
module.exports = router;
