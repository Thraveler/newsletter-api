import db from "../config/database";
import { Newsletter } from "../entities/newsletter.entity";
import { findUserById } from "./auth.service";

const newsLetterRepository = db.getRepository(Newsletter);

const getNewsLetters = async (): Promise<Newsletter[]> => {
  const newsLetterList = await newsLetterRepository
    .createQueryBuilder("newsletter")
    .leftJoinAndSelect("newsletter.owner", "user")
    .select([
      "newsletter.name",
      "newsletter.createdAt",
      "newsletter.updatedAt",
      "user.name",
      "user.email",
    ])
    .getMany();

  return newsLetterList;
};

const createNewsLetter = async (
  userId: number,
  data: Newsletter
): Promise<Newsletter | Boolean> => {
  const userFound = await findUserById(userId);

  if (!userFound) return false;

  data.owner = userFound;
  const newsletter = await newsLetterRepository.save(data);
  delete newsletter.owner;

  return newsletter;
};

export { getNewsLetters, createNewsLetter };
