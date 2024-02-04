const { StatusCodes } = require("http-status-codes");
const AuthService = require("../services/auth.service");

class AuthController {
  static async register(req, res) {
    try {
      const reqBody = req.body;
      const user = await AuthService.register(reqBody);
      res.status(StatusCodes.CREATED).json({ status: true, data: user });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: error.message,
      });
    }
  }

  static async login(req, res) {
    try {
      const reqBody = req.body;
      const token = await AuthService.login(reqBody);
      res.status(StatusCodes.OK).json({ status: true, token });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: error.message,
      });
    }
  }
  static async logout(req, res) {
    try {
      const id = req.params.id;
      await AuthService.delete(id);
      res.json({ status: true, message: "User logged out" });
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ status: false, message: error.message });
    }
  }
}
module.exports = AuthController;
