import express from "express";
import {
  ForgetPassword,
  getUserById,
  ResetPassword,
  updateUser,
  userLogin,
  userSignup,
} from "../controller/usercontroller.js";

const router = express.Router();
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/user/:id", getUserById);
router.patch("/update-user/:id", updateUser);
router.post("/forget-password", ForgetPassword);
router.post("/reset-password/:id/:token", ResetPassword);

export default router;
