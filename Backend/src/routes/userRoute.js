import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRoute = Router();
userRoute.route("/register").post(registerUser);
userRoute.route("/login").post(loginUser);

export default userRoute;
