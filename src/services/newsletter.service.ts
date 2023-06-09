import db from "../config/database";
import { Newsletter } from "../entities/newsletter.entity";
import { Subscriber } from "../entities/subscriber.entity";
import { Campaign } from "../entities/campaign.entity";
import * as UserService from "./user.service";
import * as SubscriberService from "./subscriber.service";
import * as CampaignService from "./campaign.service";

const newsletterRepository = db.getRepository(Newsletter);

const getNewsLetters = async (userId: number): Promise<Newsletter[]> => {
  const newsletterList = await newsletterRepository
    .createQueryBuilder("newsletter")
    .leftJoin("newsletter.owner", "user")
    .loadRelationCountAndMap(
      "newsletter.countSubscribers",
      "newsletter.subscribers"
    )
    .loadRelationCountAndMap(
      "newsletter.countCampaigns",
      "newsletter.campaigns"
    )
    .select([
      "newsletter.id",
      "newsletter.name",
      "newsletter.createdAt",
      "newsletter.updatedAt",
      "user.name",
      "user.email",
    ])
    .where("user.id = :userId", { userId })
    .getMany();

  return newsletterList;
};

const createNewsLetter = async (
  userId: number,
  data: Newsletter
): Promise<Newsletter | Boolean> => {
  const userFound = await UserService.findUserById(userId);

  if (!userFound) return false;

  data.owner = userFound;
  const newsletter = await newsletterRepository.save(data);
  delete newsletter.owner;

  return newsletter;
};

const findNewsletterById = async (newsletterId: number) => {
  const newsletterFound = await newsletterRepository
    .createQueryBuilder("newsletter")
    .leftJoin("newsletter.owner", "user")
    .leftJoin("newsletter.subscribers", "subscriber")
    .leftJoin("newsletter.campaigns", "campaign")
    .select([
      "newsletter.id",
      "newsletter.name",
      "user.id",
      "user.name",
      "user.lastname",
      "user.email",
      "subscriber.id",
      "subscriber.name",
      "subscriber.lastname",
      "subscriber.email",
      "campaign.id",
      "campaign.subject",
      "campaign.sendDate",
      "campaign.createdAt",
      "campaign.updatedAt",
    ])
    .where("newsletter.id = :newsletterId", { newsletterId })
    .getOne();

  return newsletterFound;
};

const addSubscriber = async (newsletterId: number, data: Subscriber) => {
  const newsletterFound = await findNewsletterById(newsletterId);

  if (!newsletterFound) return false;

  const existSubscriber = await SubscriberService.findSubscriberByEmail(data.email);

  if (existSubscriber) {
    newsletterFound.subscribers?.push(existSubscriber);

  } else {
    const subscriberCreated = await SubscriberService.createSubscriber(data);
    newsletterFound.subscribers?.push(subscriberCreated);
  }


  const newsletterUpdated = await newsletterRepository.save(newsletterFound);

  return newsletterUpdated;
};

const removeSubscriber = async (newsletterId: number, email: string) => {
  const newsletterFound = await findNewsletterById(newsletterId);

  if (!newsletterFound) return false;

  newsletterFound.subscribers = newsletterFound.subscribers?.filter((subscriber) => {
    return subscriber.email !== email
  });

  const result = await db.manager.save(newsletterFound)

  return result;
};

const addCampaign = async (newsletterId: number, data: Campaign) => {
  const newsletterFound = await findNewsletterById(newsletterId);

  if (!newsletterFound) return false;

  data.newsletter = newsletterFound;
  const campaignCreated = await CampaignService.createCampaign(data);

  newsletterFound.campaigns?.push(campaignCreated);

  const newsletterUpdated = await newsletterRepository.save(newsletterFound);

  delete campaignCreated.newsletter;

  return campaignCreated;
};

export {
  getNewsLetters,
  createNewsLetter,
  findNewsletterById,
  addSubscriber,
  removeSubscriber,
  addCampaign,
};
