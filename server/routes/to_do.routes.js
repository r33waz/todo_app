import express from "express";
import {
  CompletedTask,
  CreateTodo,
  DeleteTodo,
  FilterTodo,
  GetAllTodo,
  GetTodayTodo,
  ImportantTask,
  UpComingTask,
  UpdateTodo,
} from "../controller/to_docontroller.js";
import { authenticate } from "../middleware/authmidleware.js";

const router = express.Router();

router.post("/createTodo", authenticate, CreateTodo);
router.delete("/deleteTodo", DeleteTodo);
router.get("/all_todo", GetAllTodo);
router.patch("/update-todo/:id", UpdateTodo);
router.get("/todos/search", FilterTodo);
router.get("/completed-todo", CompletedTask);
router.get("/important-todo",ImportantTask)
router.get("/today-todo",GetTodayTodo)
router.get("/upcomming-task",UpComingTask)

export default router;
