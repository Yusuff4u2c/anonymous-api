const Message = require("../models/Message");

class MessageController {
  static async index(req, res) {
    try {
      const messages = await Message.find({});
      if (messages.length === 0) {
        throw new Error("Messages not found");
      } else {
        res.json({ status: true, data: messages });
      }
    } catch (error) {
      res.status(404).json({
        status: false,
        message: error,
      });
    }
  }

  static async show(req, res) {
    try {
      const id = req.params.id;
      const message = await Message.findById({ _id: id });
      if (!message) {
        throw new Error("Message not found");
      } else {
        res.json({ status: true, data: message });
      }
    } catch (error) {
      res.status(404).json({
        status: false,
        message: error,
      });
    }
  }
  static async create(req, res) {
    const body = req.body;
    try {
      const newMessage = new Message(body);
      await newMessage.save();
      res.json({ status: true, data: newMessage });
    } catch (error) {
      res.status(404).json({ status: false, message: error });
    }
  }

  static async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    try {
      const message = await Message.findById({ _id: id });
      if (!message) {
        throw new Error("Message not found");
      } else {
        message.set(body);
        message.save();
      }
    } catch (error) {
      res.status(404).json({
        status: false,
        message: error,
      });
    }
  }
  static async delete(req, res) {
    const id = req.params.id;
    try {
      const message = await Message.findById({ _id: id });
      if (!message) {
        throw new Error("Message not found");
      } else {
        await Message.deleteOne({ _id: id });
        res.json({ status: true, message: "Message deleted" });
      }
    } catch (error) {
      res.status(404).json({
        status: false,
        message: error,
      });
    }
  }
}
module.exports = MessageController;
