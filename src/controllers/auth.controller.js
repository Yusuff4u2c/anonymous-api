const { StatusCodes } = require("http-status-codes");
const AuthService = require("../services/auth.service");

class AuthController {
  static async register(req, res) {
    try {
      const reqBody = req.body;
      const user = await AuthService.register(reqBody);

      res
        .status(StatusCodes.CREATED)
        .json({ status: true, message: "User created", email: user.email });
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
      const { token, user } = await AuthService.login(reqBody);

      const sanitizedUser = {
        _id: user._id,
        email: user.email,
        emailIsVerified: user.emailIsVerified,
        username: user.username,
      };

      res.status(StatusCodes.OK).json({
        status: true,
        token,
        user: sanitizedUser,
      });
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

  static async verifyEmail(req, res) {
    try {
      const { token } = req.params;
      await AuthService.verifyEmail(token);
      res.status(StatusCodes.OK).json({
        status: true,
        message: "Email verified successfully",
      });
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ status: false, message: error.message });
    }
  }

  static async UpdateEmail(req, res) {
    try {
      const { oldEmail, newEmail } = req.body;
      await AuthService.UpdateEmail(oldEmail, newEmail);

      res
        .status(StatusCodes.OK)
        .json({ status: true, message: "Email updated succesfully" });
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ status: false, message: error.message });
    }
  }

  static async UpdatePassword(req, res) {
    try {
      const { email, currentPassword, newPassword } = req.body;
      await AuthService.UpdatePassword(email, currentPassword, newPassword);
      res
        .status(StatusCodes.OK)
        .json({ status: true, message: "Password updated succesfully" });
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ status: false, message: error.message });
    }
  }
}
module.exports = AuthController;
