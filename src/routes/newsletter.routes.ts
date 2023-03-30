import { Router, Request, Response } from "express";
import {
  getNewsletters,
  createNewsLetter,
  addSubscriber,
  addCampaing,
} from "../controllers/newsletter.controller";

const newsletterRouter = Router();

newsletterRouter.get("/", getNewsletters);

newsletterRouter.post("/", createNewsLetter);

newsletterRouter.post("/:newsletterId/subscribers", addSubscriber);

newsletterRouter.post("/:newsletterId/campaings", addCampaing);

export default newsletterRouter;
