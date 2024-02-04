const User = require("../models/User");
// const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configs = require("../configs");

class AuthService {
  static async register(reqBody) {
    const user = await User.findOne({ email: reqBody.email });

    if (user) {
      throw new Error("User with email already exists");
    }

    const hashedPassword = await bcrypt.hash(reqBody.password, 10);
    const newUser = new User(reqBody);
    newUser.password = hashedPassword;
    await newUser.save();
    return newUser;
  }

  static async login(reqBody) {
    const user = await User.findOne({ email: reqBody.email });
    if (!user) {
      throw new Error("There is no user with such credentials ");
    }

    const isAMatch = await bcrypt.compare(reqBody.password, user.password);
    if (!isAMatch) {
      throw new Error("Password is incorrect.");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        full_name: user.full_name,
      },
      configs.jwt_key,
      { expiresIn: "24h" }
    );

    user.token = token;
    user.save();

    return token;
  }

  static async logout(id) {
    const user = await User.findById({ _id: id });
    if (!user) {
      throw new Error("Invalid authentication token");
    }
    user.token = null;
    admin.save();
  }

  static async validateToken(user_id, token) {
    try {
      const user = await User.findById({ _id: user_id });
      if (!user) {
        throw new Error("Invalid authentication token 1");
      }

      if (user.token != token) {
        throw new Error("Invalid authentication token 2");
      }
    } catch (error) {
      throw new Error("Invalid authentication token: " + error.message);
    }
  }
}
module.exports = AuthService;
