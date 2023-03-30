import db from "../config/database";
import { Newsletter } from "../entities/newsletter.entity";
import { Subscriber } from "../entities/subscriber.entity";
import { Campaing } from "../entities/campaing.entity";
import { findUserById } from "./auth.service";
import * as SubscriberService from "./subscriber.service";
import * as CampaingService from "./campaing.service";

const newsletterRepository = db.getRepository(Newsletter);

const getNewsLetters = async (): Promise<Newsletter[]> => {
  const newsletterList = await newsletterRepository
    .createQueryBuilder("newsletter")
    .leftJoinAndSelect("newsletter.owner", "user")
    .leftJoin("newsletter.subscribers", "subscriber")
    .leftJoin("newsletter.campaings", "campaing")
    .select([
      "newsletter.name",
      "newsletter.createdAt",
      "newsletter.updatedAt",
      "user.name",
      "user.email",
      "subscriber.email",
      "campaing.subject",
    ])
    .getMany();

  return newsletterList;
};

const createNewsLetter = async (
  userId: number,
  data: Newsletter
): Promise<Newsletter | Boolean> => {
  const userFound = await findUserById(userId);

  if (!userFound) return false;

  data.owner = userFound;
  const newsletter = await newsletterRepository.save(data);
  delete newsletter.owner;

  return newsletter;
};

const findNewsletterById = async (newsletterId: number) => {
  const newsletterFound = await newsletterRepository
    .createQueryBuilder("newsletter")
    .leftJoin("newsletter.subscribers", "subscriber")
    .select([
      "newsletter.name",
      "newsletter.id",
      "subscriber.email",
      "subscriber.id",
    ])
    .getOne();

  return newsletterFound;
};

const addSubscriber = async (newsletterId: number, data: Subscriber) => {
  const newsletterFound = await findNewsletterById(newsletterId);

  if (!newsletterFound) return false;

  const subscriberCreated = await SubscriberService.createSubscriber(data);

  newsletterFound.subscribers?.push(subscriberCreated);

  const newsletterUpdated = await newsletterRepository.save(newsletterFound);

  return newsletterUpdated;
};

const addCampaing = async (newsletterId: number, data: Campaing) => {
  const newsletterFound = await findNewsletterById(newsletterId);

  if (!newsletterFound) return false;

  data.newsletter = newsletterFound;
  const campaingCreated = await CampaingService.createCampaing(data);

  newsletterFound.campaings?.push(campaingCreated);

  const newsletterUpdated = await newsletterRepository.save(newsletterFound);

  return newsletterUpdated;
};

export { getNewsLetters, createNewsLetter, addSubscriber, addCampaing };
