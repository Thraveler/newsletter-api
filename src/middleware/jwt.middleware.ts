import { Request, Response, NextFunction } from "express";
import { JwtDecoded } from "../interfaces/jwtDecoded.interface";
import { vefiryAuthorization } from "../utils/jwt.util";

const validateAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    vefiryAuthorization(`${req.headers.authorization}`);

    next();
  } catch (error) {
    res.status(403).json({
      message: "Token not valid",
    });
  }
};

export { validateAuthorization };
