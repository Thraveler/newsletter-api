import { Request, Response } from "express";
import * as NewsletterService from "../services/newsletter.service";

const register = async (req: Request, res: Response) => {
  res.json("Hi from register");
};

const login = async (req: Request, res: Response) => {
  res.json("Hi from login");
};

export { register, login };
