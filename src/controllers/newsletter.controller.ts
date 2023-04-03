import { Request, Response } from "express";
import * as NewsletterService from "../services/newsletter.service";
import { vefiryAuthorization } from "../utils/jwt.util";

const getNewsletters = async (req: Request, res: Response) => {
  try {
    const jwtDecoded = vefiryAuthorization(`${req.headers.authorization}`);
    const newsletterList = await NewsletterService.getNewsLetters(
      jwtDecoded.userId
    );

    res.json(newsletterList);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "There was an error while fetch newsletters list!",
    });
  }
};

const createNewsLetter = async (req: Request, res: Response) => {
  try {
    const jwtDecoded = vefiryAuthorization(`${req.headers.authorization}`);
    const newsletter = await NewsletterService.createNewsLetter(
      jwtDecoded.userId,
      req.body
    );

    res.status(201).json(newsletter);
  } catch (error) {
    console.error(error);

    res.json({
      message: "There was an error during create newsletter!",
    });
  }
};

const getNewsletterById = async (req: Request, res: Response) => {
  try {
    const newsletterFounded = await NewsletterService.findNewsletterById(
      +req.params.newsletterId
    );

    if (!newsletterFounded) {
      res.status(404).json({
        message: "Newsletter not found!",
      });
    } else {
      res.json(newsletterFounded);
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "There was an error while fetch newsletter!",
    });
  }
};

const addSubscriber = async (req: Request, res: Response) => {
  try {
    const newsletterUpdated = await NewsletterService.addSubscriber(
      +req.params.newsletterId,
      req.body
    );

    res.status(201).json({
      message: "Subscriber added to newsletter!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "There was an error during add subscriber to newsletter!",
    });
  }
};

const addCampaign = async (req: Request, res: Response) => {
  req.body.image = req.file?.filename;

  try {
    const campaignCreated = await NewsletterService.addCampaign(
      +req.params.newsletterId,
      req.body
    );

    res.status(201).json(
      campaignCreated
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "There was an error during add campaign to newsletter!",
    });
  }
};

export {
  getNewsletters,
  createNewsLetter,
  getNewsletterById,
  addSubscriber,
  addCampaign,
};
