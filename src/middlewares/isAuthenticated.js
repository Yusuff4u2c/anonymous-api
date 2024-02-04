const jwt = require("jsonwebtoken");
const configs = require("../configs");
const AuthService = require("../services/auth.service");
const { StatusCodes } = require("http-status-codes");

module.exports = async function (req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ status: false, message: "Not authenticated" });
    }

    const token = authorization.split(" ")[1];
    const userPayload = jwt.verify(token, configs.jwt_key);
    req.user = userPayload;

    await AuthService.validateToken(userPayload._id, token);
  } catch (e) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ status: false, message: "invalid authentication" });
  }
  next();
};
