const User = require("../models/User");
// const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configs = require("../configs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
class AuthService {
  static async register(reqBody) {
    const user = await User.findOne({ email: reqBody.email });

    if (user) {
      throw new Error("User with email already exists");
    }
    const emailVerificationToken = crypto.randomBytes(20).toString("hex");
    console.log(emailVerificationToken);

    const hashedPassword = await bcrypt.hash(reqBody.password, 10);

    const newUser = new User({
      ...reqBody,
      emailVerificationToken: emailVerificationToken,
      password: hashedPassword,
    });

    await newUser.save();
    await this.sendVerificationEmail(newUser.email, emailVerificationToken);
    return newUser;
  }

  static async login(reqBody) {
    const user = await User.findOne({ email: reqBody.email });
    if (!user) {
      throw new Error("There is no user with such credentials ");
    }

    if (!user.verified) {
      throw new Error("Email is not verified yet");
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

  static async sendVerificationEmail(email, token) {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "903480d8ed01dc",
        pass: "2afb958567b4e9",
      },
    });
    const mailOptions = {
      from: "hushhive.com",
      to: email,
      subject: "Email Verification",
      text: `Click on the following link to verify your email: 127.0.0.1:8000/verify/${token}`,
    };

    await transporter.sendMail(mailOptions);
  }
}
module.exports = AuthService;
