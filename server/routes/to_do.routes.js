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

router.post("/createTodo", 
  // authenticate, 
  CreateTodo);
router.delete("/deleteTodo/:id", DeleteTodo);
router.get("/all_todo/:id", GetAllTodo);
router.patch("/update-todo/:id", UpdateTodo);
router.get("/todos/search", FilterTodo);
router.get("/completed-todo/search", CompletedTask);
router.get("/important-todo/search",ImportantTask)
router.get("/today-todo",GetTodayTodo)
router.get("/upcomming-task/:id",UpComingTask)

export default router;
