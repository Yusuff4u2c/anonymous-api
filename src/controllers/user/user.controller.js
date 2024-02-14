const { StatusCodes } = require("http-status-codes");
const UserService = require("../../services/user/user.service");

class UserController {
  static async show(req, res) {
    try {
      const { username } = req.params;
      const user = await UserService.show(username);
      res.json({ status: true, user });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: false,
        user: error.message,
      });
    }
  }
}
module.exports = UserController;
