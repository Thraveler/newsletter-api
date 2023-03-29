import { Router, Request, Response } from "express";
import {
  getNewsletters,
  createNewsLetter,
} from "../controllers/newsletter.controller";

const newsletterRouter = Router();

newsletterRouter.get("/", getNewsletters);

newsletterRouter.post("/", createNewsLetter);

export default newsletterRouter;
