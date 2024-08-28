import express from "express";
import userRoute from "./user.routes.js"

const router = express.Router()

router.use("/api/v1",userRoute)

export default router