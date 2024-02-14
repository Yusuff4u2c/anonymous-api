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

    const hashedPassword = await bcrypt.hash(reqBody.password, 10);

    const newUser = new User({
      ...reqBody,
      emailVerificationToken: emailVerificationToken,
      password: hashedPassword,
    });
    const { _id, email, emailIsVerified, username } = newUser;
    await newUser.save();
    await this.sendVerificationEmail(newUser.email, emailVerificationToken);
    return { _id, email, emailIsVerified, username };
  }

  static async login(reqBody) {
    const user = await User.findOne({ email: reqBody.email });
    if (!user) {
      throw new Error("There is no user with such credentials ");
    }

    if (!user.emailIsVerified) {
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

    return { token, user };
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
    const user = await User.findById(user_id);
    if (!user || user.token !== token) {
      throw new Error("Invalid authentication");
    }
  }

  static async verifyEmail(token) {
    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      throw new Error("Invalid token");
    }
    user.emailIsVerified = true;
    user.emailVerificationToken = null;
    await user.save();
  }

  static async SendPasswordResetEmail(email, password) {
    const user = await User.findOne({ email: email });
    const isAMatch = bcrypt.compare(user.password, password);

    if (!user) {
      throw new Error("User not found");
    }
    if (!isAMatch) {
      throw new Error("Incorect password");
    }
    const updateToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

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
      subject: "Password Reset",
      html: `<p> You are receiving this email because you (or someone else) has requested to reset the password for your account.</p>
       <p> Please click on the following link, or paste this into your browser to complete the process:</p>
       <a href="${configs.frontend_url}/${configs.update_password_endpoint}/${updateToken}">Reset Password</a>
      <p> If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
    };
    await transporter.sendMail(mailOptions);
  }

  static async UpdatePassword(email, currentPassword, newPassword) {
    const user = await User.findOne({ email: email });
    const isAMatch = await bcrypt.compare(currentPassword, user.password);
    if (!user) {
      throw new Error("User not found");
    }
    if (!isAMatch) {
      throw new Error("Invalid password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
  }

  static async UpdateEmail(oldEmail, newEmail) {
    const user = await User.findOne({ email: oldEmail });
    if (!user) {
      throw new Error("User not found");
    }
    const emailVerificationToken = crypto.randomBytes(20).toString("hex");
    Object.assign(user, {
      email: newEmail,
      emailIsVerified: false,
      emailVerificationToken,
    });
    await user.save();
    await this.sendVerificationEmail(newEmail, emailVerificationToken);
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
      html: `<p> Click on the following link to verify your email: </p> <a href="${configs.frontend_url}/${configs.verify_email_endpoint}/${token}">verify</a>`,
    };

    await transporter.sendMail(mailOptions);
  }
}
module.exports = AuthService;
