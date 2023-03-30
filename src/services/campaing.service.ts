import db from "../config/database";
import { Campaing } from "../entities/campaing.entity";

const campaingRepository = db.getRepository(Campaing);

const createCampaing = async (data: Campaing): Promise<Campaing> => {
  const campaingCreated = await campaingRepository.save(data);

  return campaingCreated;
};

export { createCampaing };
