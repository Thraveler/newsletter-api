import db from "../config/database";
import { Newsletter } from "../entities/newsletter.entity";
import { INewsletter } from "../interfaces/newsletter.interface";

const newsLetterRepository = db.getRepository(Newsletter);

const getNewsLetters = async (): Promise<Newsletter[]> => {
  const newsLetterList = await newsLetterRepository.find();

  return newsLetterList;
};

const createNewsLetter = async (data: INewsletter): Promise<Newsletter> => {
  const newsletter = await newsLetterRepository.save(data);

  return newsletter;
};

export { getNewsLetters, createNewsLetter };
