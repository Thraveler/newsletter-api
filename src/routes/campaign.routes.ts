import { Router } from "express";
import { sendCampaign } from "../controllers/campaign.controller";

const campaignRouter = Router();

campaignRouter.post("/:campaignId", sendCampaign);

export default campaignRouter;
