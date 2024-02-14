const { StatusCodes } = require("http-status-codes");
const MessageService = require("../../services/user/message.service");

class MessageController {
  static async index(req, res) {
    try {
      const { user_id } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const messages = await MessageService.index(user_id, page, limit);
      res.json({ status: true, data: messages });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
        status: false,
        message: error.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const { username } = req.params;
      const { message } = req.body;
      const newMessage = await MessageService.create(username, message);
      res.json({ status: true, data: newMessage });
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ status: false, message: error.message });
    }
  }
}
module.exports = MessageController;
