import express from "express";
import { getUserById, updateUser, userLogin, userSignup } from "../controller/usercontroller.js";


const router = express.Router();
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/user/:id",getUserById)
router.patch("/update-user/:id",updateUser)

export default router;
