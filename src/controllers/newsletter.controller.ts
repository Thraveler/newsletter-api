import { Request, Response } from "express";

const getNewsletters = (req: Request, res: Response) => {
  res.json({
    message: "Hi from newsletter",
  });
};

export { getNewsletters };
