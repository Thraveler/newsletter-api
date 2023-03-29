import express from "express";
import newsletterRouter from "./newsletter.routes";
import authRouter from "./auh.routes";

const router = express.Router();

router.use("/api/newsletter", newsletterRouter);
router.use("/auth", authRouter);

export default router;
