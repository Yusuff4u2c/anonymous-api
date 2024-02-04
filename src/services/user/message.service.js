const Message = require("../../models/Message");

class MessageService {
  static async index(user_id) {
    const messages = await Message.findOne({ user: user_id });
    if (!messages) {
      throw new Error("Messages not found");
    }
    return messages;
  }

  static async create(reqBody) {
    const newMessage = new Message(reqBody);
    console.log("service: ", newMessage);
    await newMessage.save();
    return newMessage;
  }
}
module.exports = MessageService;
