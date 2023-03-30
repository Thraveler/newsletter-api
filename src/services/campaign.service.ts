import db from "../config/database";
import { Campaign } from "../entities/campaign.entity";

const campaignRepository = db.getRepository(Campaign);

const createCampaign = async (data: Campaign): Promise<Campaign> => {
  const campaignCreated = await campaignRepository.save(data);

  return campaignCreated;
};

export { createCampaign };
