const Message = require("../../models/Message");

class AdminMessageService {
  static async index() {
    const messages = await Message.find({});
    if (!messages) {
      throw new Error("Messages not found");
    }
    return messages;
  }

  static async show(user_id) {
    const messages = await Message.findMany({ user: user_id });
    if (!messages) {
      throw new Error("Messages not found");
    }
    return messages;
  }
}
module.exports = AdminMessageService;
