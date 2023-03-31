import db from "../config/database";
import { Campaign } from "../entities/campaign.entity";

const campaignRepository = db.getRepository(Campaign);

const createCampaign = async (data: Campaign): Promise<Campaign> => {
  const campaignCreated = await campaignRepository.save(data);

  return campaignCreated;
};

const getCampaignById = async (
  campaignId: number
): Promise<Campaign | null> => {
  const campaignFound = await campaignRepository
    .createQueryBuilder("campaign")
    .leftJoin("campaign.newsletter", "newsletter")
    .select([
      "campaign.id",
      "campaign.subject",
      "campaign.content",
      "newsletter.id",
    ])
    .where("campaign.id = :campaignId", { campaignId })
    .getOne();

  return campaignFound;
};

const updateCampaign = async (campaign: Campaign) => {
  const campaignFound = await campaignRepository.save(campaign);

  return campaignFound;
};

export { createCampaign, getCampaignById, updateCampaign };
