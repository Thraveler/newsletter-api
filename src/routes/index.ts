import express from "express";
import newsletterRouter from "./newsletter.routes";

const router = express.Router();

router.use("/newsletter", newsletterRouter);

export default router;
