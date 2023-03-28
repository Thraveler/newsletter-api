import { Router, Request, Response } from "express";
import { getNewsletters } from "../controllers/newsletter.controller";

const newsletterRouter = Router();

newsletterRouter.get("/", getNewsletters);

export default newsletterRouter;
