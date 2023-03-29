import { hash, compare, genSalt } from "bcryptjs";

const encrypt = async (toEncrypt: string) => {
  const salts = await genSalt(10);
  const encrypted = await hash(toEncrypt, salts);

  return encrypted;
};

const decrypt = async (toCompare: string, hash: string) => {
  const isEqual = await compare(toCompare, hash);

  return isEqual;
};

export { encrypt, decrypt };
