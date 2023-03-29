import express from "express";
import newsletterRouter from "./newsletter.routes";
import authRouter from "./auh.routes";
import { validateAuthorization } from "../middleware/jwt.middleware";

const router = express.Router();

router.use("/api/newsletter", validateAuthorization, newsletterRouter);
router.use("/auth", authRouter);

export default router;
