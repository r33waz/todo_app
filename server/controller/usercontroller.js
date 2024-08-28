import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username) {
      return res.status(400).json({
        status: false,
        message: "Provide your username",
      });
    }

    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Provide your email",
      });
    }

    if (!password) {
      return res.status(400).json({
        status: false,
        message: "Provide your password",
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        status: false,
        message: "Username already exists",
      });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        status: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({
      status: true,
      message: "Signup Successfully",
    });
  } catch (error) {
    console.log(error);
    // If there's an error, handle it
    if (error.name === "ValidationError") {
      // Mongoose validation error occurred
      const errors = Object.values(error?.errors).map((err) => err.message);
      return res.status(400).json({
        status: false,
        message: errors,
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }
  }
};

// login user

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email) {
      return res.status(400).json({
        status: false,
        message: "Provide your email",
      });
    }

    if (!password) {
      return res.status(400).json({
        status: false,
        message: "Provide your password",
      });
    }

    const existtingUser = await User.findOne({ email });
    if (!existtingUser) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, existtingUser?.password);
    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        email: existtingUser.email,
        id: existtingUser._id,
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: "5d",
      }
    );

    return res.status(200).json({
      status: true,
      message: "Login Successfully",
      data: {
        username: existtingUser.username,
        email: existtingUser.email,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
