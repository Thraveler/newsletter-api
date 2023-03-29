import { Request, Response } from "express";
import * as NewsletterService from "../services/newsletter.service";
import { vefiryAuthorization } from "../utils/jwt.util";

const getNewsletters = async (req: Request, res: Response) => {
  const newsLetterList = await NewsletterService.getNewsLetters();

  res.json(newsLetterList);
};

const createNewsLetter = async (req: Request, res: Response) => {
  const jwtDecoded = vefiryAuthorization(`${req.headers.authorization}`);
  const newsLetter = await NewsletterService.createNewsLetter(
    jwtDecoded.userId,
    req.body
  );

  res.json(newsLetter);
};

export { getNewsletters, createNewsLetter };
