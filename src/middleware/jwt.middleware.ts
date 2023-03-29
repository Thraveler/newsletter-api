import { Request, Response, NextFunction } from "express";
import { vefiryToken } from "../utils/jwt.util";

const validateAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ").pop();
    const isValid = vefiryToken(`${token}`);

    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({
      message: "Token not valid",
    });
  }
};

export { validateAuthorization };
