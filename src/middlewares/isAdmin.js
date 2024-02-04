const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

module.exports = async function (req, res, next) {
  const userPayload = req.user;
  const user = await User.findById(userPayload._id);
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: false,
      message: "Not authenticated",
    });
  }

  if (user.role !== "admin") {
    return res.status(StatusCodes.FORBIDDEN).json({
      status: false,
      message: "Not authorized to perform this action",
    });
  }
  next();
};
