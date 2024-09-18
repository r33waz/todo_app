import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendmail.js";

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
        expiresIn: '3d'
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

export const ForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        state: false,
        message: "User not found",
      });
    }

    if (user) {
      const token = jwt.sign({ _id: user?._id },  process.env.JWT_TOKEN, {
        expiresIn: "5m",
      });
      const setUserToken = await User.findByIdAndUpdate(
        { _id: user?._id },
        { verifytoken: token },
        { new: true }
      );
      if (setUserToken) {
        const URL = `${process.env.CLIENT_URL}/resetPassword/${user?._id}/${token}`;
        const message = `<p>Dear ${user.username},</p><br>
  <p>We have received a request to reset your password for your account.<br> If you did not request a password reset, please ignore this email.</p>
  <p>To reset your password, please click the link below:</p>
  <p >Note :<span style="color: red ;">that link expires in 5 minutes</span></p>
  <a href="${URL}">Reset Password</a>`;
        sendEmail(user.email, "Reset password", message);
        return res.status(200).json({
          status: true,
          message: `An link has been sent to your email.`,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const ResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log(password);
  try {
    const validuser = await User.findOne({ _id: id, verifytoken: token });

    const verifyToken = jwt.verify(token, process.env.JWT_TOKEN);

    if (validuser && verifyToken._id) {
      const newpassword = await bcrypt.hash(password, 10);

      const setnewuserpass = await User.findByIdAndUpdate(
        { _id: id },
        { password: newpassword }
      );

      setnewuserpass.save();
      res
        .status(201)
        .json({ status: 201, message: "Password updated sucessfully" });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: false,
        message: "Token has expired",
      });
    }

    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
    
  }
};

