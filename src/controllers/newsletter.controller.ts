import { Request, Response } from "express";
import * as NewsletterService from "../services/newsletter.service";
import { vefiryAuthorization } from "../utils/jwt.util";

const getNewsletters = async (req: Request, res: Response) => {
  const newsletterList = await NewsletterService.getNewsLetters();

  res.json(newsletterList);
};

const createNewsLetter = async (req: Request, res: Response) => {
  const jwtDecoded = vefiryAuthorization(`${req.headers.authorization}`);
  const newsletter = await NewsletterService.createNewsLetter(
    jwtDecoded.userId,
    req.body
  );

  res.json(newsletter);
};

const addSubscriber = async (req: Request, res: Response) => {
  const newsletterUpdated = await NewsletterService.addSubscriber(
    +req.params.newsletterId,
    req.body
  );

  res.json(newsletterUpdated);
};

const addCampaing = async (req: Request, res: Response) => {
  const campaingCreated = await NewsletterService.addCampaing(
    +req.params.newsletterId,
    req.body
  );

  res.json(campaingCreated);
};

export { getNewsletters, createNewsLetter, addSubscriber, addCampaing };
