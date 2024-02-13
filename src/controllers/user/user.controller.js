const { StatusCodes } = require("http-status-codes");
const UserService = require("../../services/user/user.service");

class UserController {
  static async show(req, res) {
    try {
      const user_id = req.user_id;
      const user = await UserService.show(user_id);
      res.json({ status: true, data: user });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: false,
        user: error.message,
      });
    }
  }
}
module.exports = UserController;
