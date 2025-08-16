import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  readTodo,
  updateTodo,
} from "../controllers/todoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const todoRoute = Router();
todoRoute.route("/create").post(authMiddleware, createTodo);
todoRoute.route("/readAll/:userId").get(authMiddleware, readTodo);
todoRoute.route("/update/:id").patch(authMiddleware, updateTodo);
todoRoute.route("/delete/:id").delete(authMiddleware, deleteTodo);

export default todoRoute;
