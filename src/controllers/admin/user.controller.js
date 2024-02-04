const { StatusCodes } = require("http-status-codes");
const AdminUserService = require("../../services/admin/user.service");
class UserController {
  static async index(req, res) {
    try {
      const users = await AdminUserService.index();
      res.json({ status: true, data: users });
    } catch (error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: false, message: error.message });
    }
  }
  static async show(req, res) {
    try {
      const user_id = req.params.user_id;
      const user = await AdminUserService.index(user_id);
      res.json({ status: true, data: user });
    } catch (error) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: false, message: error.message });
    }
  }
  static async delete(req, res) {
    try {
      const user_id = req.params.user_id;
      await AdminUserService.delete(user_id);
      res.json({ status: true, data: "User deleted" });
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ status: false, message: error.message });
    }
  }
}
module.exports = UserController;
