import { Request, Response } from "express";
import * as NewsletterService from "../services/newsletter.service";

const getNewsletters = async (req: Request, res: Response) => {
  const newsLetterList = await NewsletterService.getNewsLetters();

  res.json(newsLetterList);
};

const createNewsLetter = async (req: Request, res: Response) => {
  const newsLetter = await NewsletterService.createNewsLetter(req.body);

  res.json(newsLetter);
};

export { getNewsletters, createNewsLetter };
