const User = require("../models/User");

class UserController {
  static async index(req, res) {
    try {
      const users = await User.find({});
      if (users.length === 0) {
        throw new Error("Users not found");
      } else {
        res.json({ status: true, data: users });
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
      const user = await User.findById({ _id: id });
      if (!user) {
        throw new Error("Users not found");
      } else {
        res.json({ status: true, data: user });
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
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        throw new Error("User name already exists");
      } else {
        const newUser = new User(body);
        await newUser.save();
        res.json({ status: true, data: newUser });
      }
    } catch (error) {
      res.status(404).json({ status: false, message: error });
    }
  }

  static async update(req, res) {
    const id = req.params.id;
    const body = req.body;
    try {
      const user = await User.findById({ _id: id });
      if (!user) {
        throw new Error("User not found");
      } else {
        user.set(body);
        user.save();
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
      const user = await User.findById({ _id: id });
      if (!user) {
        throw new Error("User not found");
      } else {
        await User.deleteOne({ _id: id });
        res.json({ status: true, message: "User deleted" });
      }
    } catch (error) {
      res.status(404).json({
        status: false,
        message: error,
      });
    }
  }
}
module.exports = UserController;
