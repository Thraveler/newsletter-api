import { Router, Request, Response } from "express";
import {
  getNewsletters,
  createNewsLetter,
  getNewsletterById,
  addSubscriber,
  addCampaign,
} from "../controllers/newsletter.controller";
import multer from "../middleware/multer.middleware"

const newsletterRouter = Router();

newsletterRouter.get("/", getNewsletters);

newsletterRouter.post("/", createNewsLetter);

newsletterRouter.get("/:newsletterId", getNewsletterById);

newsletterRouter.post("/:newsletterId/subscribers", addSubscriber);

newsletterRouter.post("/:newsletterId/campaigns", multer.single('newsletter'), addCampaign);

export default newsletterRouter;
