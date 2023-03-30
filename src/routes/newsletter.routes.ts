import { Router, Request, Response } from "express";
import {
  getNewsletters,
  createNewsLetter,
  addSubscriber,
} from "../controllers/newsletter.controller";

const newsletterRouter = Router();

newsletterRouter.get("/", getNewsletters);

newsletterRouter.post("/", createNewsLetter);

newsletterRouter.post("/:newsletterId/subscribers", addSubscriber);

export default newsletterRouter;
