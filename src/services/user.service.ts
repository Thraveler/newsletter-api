import db from "../config/database";
import { User } from "../entities/user.entity";

const userRepository = db.getRepository(User);

const findUserById = async (userId: number): Promise<User | null> => {
  const userFound = await userRepository.findOneBy({ id: userId });

  return userFound;
};

export { findUserById };
