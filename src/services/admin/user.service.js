const User = require("../../models/User");
// const { StatusCodes } = require("http-status-codes");
const configs = require("../../configs");

class UserService {
  static async index() {
    const users = await User.find({});
    if (!users) {
      throw new Error("No user found");
    }
    return users;
  }
  static async show(id) {
    const user = await User.findById({ _id: id });
    if (!user) {
      throw new Error("No user found");
    }

    return user;
  }
}
module.exports = UserService;
