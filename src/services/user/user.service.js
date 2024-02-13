const User = require("../../models/User");

class UserService {
  static async show(user_id) {
    const user = await User.findOne({ user: user_id });
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  }
}
module.exports = UserService;
