import express from "express";
import { userLogin, userSignup } from "../controller/usercontroller.js";
import { authenicate } from "../middleware/authmidleware.js";

const router = express.Router();
router.post("/signup", userSignup);
router.post("/login", userLogin);

export default router;
