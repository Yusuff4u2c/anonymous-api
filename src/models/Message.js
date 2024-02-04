const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
