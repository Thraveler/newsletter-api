import { Router, Request, Response } from "express";
import {
  getNewsletters,
  createNewsLetter,
  getNewsletterById,
  addSubscriber,
  addCampaign,
} from "../controllers/newsletter.controller";

const newsletterRouter = Router();

newsletterRouter.get("/", getNewsletters);

newsletterRouter.post("/", createNewsLetter);

newsletterRouter.get("/:newsletterId", getNewsletterById);

newsletterRouter.post("/:newsletterId/subscribers", addSubscriber);

newsletterRouter.post("/:newsletterId/campaigns", addCampaign);

export default newsletterRouter;
