import { Router } from "express";
import {
  sendCampaign,
  getCampaignById,
} from "../controllers/campaign.controller";

const campaignRouter = Router();

campaignRouter.get("/:campaignId", getCampaignById);

campaignRouter.post("/:campaignId", sendCampaign);

export default campaignRouter;
