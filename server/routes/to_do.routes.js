import express from "express";
import {
  CompletedTask,
  CreateTodo,
  DeleteTodo,
  FilterTodo,
  FindSingleTodo,
  GetAllTodo,
  GetTodayTodo,
  ImportantTask,
  toggleImportantTask,
  UpComingTask,
  UpdateTodo,
} from "../controller/to_docontroller.js";
import { authenticate } from "../middleware/authmidleware.js";

const router = express.Router();

router.post("/createTodo", authenticate, CreateTodo);
router.delete("/deleteTodo/:id", authenticate, DeleteTodo);
router.get("/all_todo/:id", authenticate, GetAllTodo);
router.get("/single_todo/:id", authenticate, FindSingleTodo);
router.patch("/update-todo/:id", authenticate, UpdateTodo);
router.get("/todos/search", authenticate, FilterTodo);
router.get("/completed-todo/search", authenticate, CompletedTask);
router.get("/important-todo/search", authenticate, ImportantTask);
router.get("/today-todo/search", authenticate, GetTodayTodo);
router.get("/upcomming-task/search", authenticate, UpComingTask);
router.patch("/toggle-todo/:id", authenticate, toggleImportantTask);

export default router;
