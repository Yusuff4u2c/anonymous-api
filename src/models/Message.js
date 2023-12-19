const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  message: { type: string, required: true },
  created_at: { type: Date, default: Date.now() },
});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
