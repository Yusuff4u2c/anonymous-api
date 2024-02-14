const Message = require("../../models/Message");
const User = require("../../models/User");

class MessageService {
  static async index(user_id, page, limit) {
    const messages = await Message.find({ user_id: user_id })
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    if (!messages) {
      throw new Error("Messages not found");
    }
    return messages;
  }

  static async create(username, message) {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error("User not found");
    }
    const user_id = user._id;

    const newMessage = new Message({ message, user_id });
    await newMessage.save();
    return newMessage;
  }
}
module.exports = MessageService;
