import { sign, verify } from "jsonwebtoken";
import { JwtDecoded } from "../interfaces/jwtDecoded.interface";
const JWT_SECRET = process.env.JWT_SECRET || "nonsecuresecret";

const generateToken = async (userId: string) => {
  const jwtGenerated = sign({ userId }, JWT_SECRET, {
    expiresIn: "2h",
  });

  return jwtGenerated;
};

const vefiryAuthorization = (authorization: string): JwtDecoded => {
  const token = authorization.split(" ").pop();
  const jwtDecoded = verify(`${token}`, JWT_SECRET) as JwtDecoded;

  return jwtDecoded;
};

export { generateToken, vefiryAuthorization };
