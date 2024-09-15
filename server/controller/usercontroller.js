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
        id: existtingUser._id,
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: '30s'
      }
    );

    return res.status(200).json({
      status: true,
      message: "Login Successfully",
      data: {
        _id: existtingUser._id,
        username: existtingUser.username,
        email: existtingUser.email,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

//get user by id

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, oldpassword, newpassword } = req.body;

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }

    // Check if the email is already used by another user
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== id) {
      return res.status(400).json({
        status: false,
        message: "Email already exists",
      });
    }

    // Check if the old password matches, if provided
    if (oldpassword) {
      const isMatch = await bcrypt.compare(oldpassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          status: false,
          message: "Invalid old password",
        });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newpassword, 12);

      // Update user with new password
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            username,
            email,
            password: hashedPassword,
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(400).json({
          status: false,
          message: "Invalid Attempt",
        });
      }

      return res.status(200).json({
        status: true,
        message: `${updatedUser.username} updated`,
      });
    } else {
      // Update user without changing the password
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            username,
            email,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        status: true,
        message: `${updatedUser.username} updated`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

