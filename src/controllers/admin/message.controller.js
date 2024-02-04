const { StatusCodes } = require("http-status-codes");
const AdminMessageService = require("../../services/admin/message.service");

class MessageController {
  static async index(req, res) {
    try {
      const messages = await AdminMessageService.index();
      res.json({ status: true, data: messages });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: false,
        message: error.message,
      });
    }
  }
  static async show(req, res) {
    try {
      const user_id = req.params.user_id;
      const messages = await AdminMessageService.show(user_id);
      res.json({ status: true, data: messages });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = MessageController;
