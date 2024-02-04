const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
  password: {
    type: String,
    minLength: 5,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
