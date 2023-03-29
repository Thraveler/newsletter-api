import db from "../config/database";
import { User } from "../entities/user.entity";
import { IUser } from "../interfaces/user.interface";
import { IAuth } from "../interfaces/auth.interface";
import { encrypt, decrypt } from "../utils/bcrypt.util";
import { generateToken } from "../utils/jwt.util";

const userRepository = db.getRepository(User);

const createUser = async (data: IUser): Promise<User> => {
  data.password = await encrypt(data.password);
  const userCreated = await userRepository.save(data);

  return userCreated;
};

const loginUser = async (data: IAuth): Promise<String | Boolean> => {
  const userFound = await userRepository.findOne({
    where: { email: data.email },
  });

  if (!userFound) return false;

  const isLogged: boolean = await decrypt(data.password, userFound.password);

  if (!isLogged) return false;

  const jwt = await generateToken(`${userFound.id}`);

  return jwt;
};

export { createUser, loginUser };
