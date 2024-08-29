import express from "express";
import userRoute from "./user.routes.js";
import todoRouter from "./to_do.routes.js";
const router = express.Router();

router.use("/api/v1", userRoute);
router.use("/api/v1", todoRouter);

export default router;
