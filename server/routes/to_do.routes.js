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

router.post("/createTodo", 
  authenticate, 
  CreateTodo);
router.delete("/deleteTodo/:id", authenticate,  DeleteTodo);
router.get("/all_todo/:id", GetAllTodo);
router.get("/single_todo/:id",FindSingleTodo)
router.patch("/update-todo/:id", UpdateTodo);
router.get("/todos/search", FilterTodo);
router.get("/completed-todo/search", CompletedTask);
router.get("/important-todo/search",ImportantTask)
router.get("/today-todo/search",GetTodayTodo)
router.get("/upcomming-task/search",UpComingTask)
router.patch("/toggle-todo/:id",toggleImportantTask)

export default router;
