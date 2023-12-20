const User = require("../models/Message");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configs = require("../configs");

class AuthController {
  static async register(req, res) {
    const body = req.body;
    try {
      const user = await User.find({ email: body.email });
      if (user) {
        throw new Error("User with email already");
      } else {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const newUser = new User(data);
        newUser.password = hashedPassword;
        await newUser.save();
        res.json({ status: true, data: newUser });
      }
    } catch (error) {
      res.status(404).json({
        status: false,
        message: error,
      });
    }
  }

  static async login(req, res) {
    const data = req.body;

    try {
      const user = await User.findOne({ email: data.email });
      if (!user) {
        throw new Error(`There is no user with ${data.email}`);
      } else {
        const isAMatch = bcrypt.compare(user.password, data.password);
        if (!isAMatch) {
          throw new Error("Wrong password");
        } else {
          const token = jwt.sign(
            { _id: user._id, email: user.email },
            configs.jwt_key,
            { expiresIn: "24h" }
          );
          user.token = token;
          user.save();
          res.json({ status: true, data: user, token: token });
        }
      }
    } catch (error) {
      res.status(404).json({
        status: false,
        message: error,
      });
    }
  }
  static async logout(req, res) {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("Invalid authentication token.");
    } else {
      user.token = null;
      user.save();
    }
  }
}
