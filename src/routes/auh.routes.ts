import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.get("/register", register);

authRouter.get("/login", login);

export default authRouter;
