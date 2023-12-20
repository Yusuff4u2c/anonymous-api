const userRouter = require("../routes/user.route");
const messageRouter = require("../routes/message.route");
const express = require("express");
const router = express.Router();

router.use("/users", userRouter);
router.use("/messages", messageRouter);

module.exports = function registeredRoutes(app) {
  app.use("/", router);
};
