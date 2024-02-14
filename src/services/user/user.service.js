const User = require("../../models/User");

class UserService {
  static async show(username) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  }
}
module.exports = UserService;
