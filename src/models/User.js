const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: string, required: true },
  username: { type: string, required: true },
  created_at: { type: Date, default: Date.now() },
  password: {
    type: String,
    minLength: 8,
  },
  token: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
