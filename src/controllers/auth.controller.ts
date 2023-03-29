import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

const register = async (req: Request, res: Response) => {
  const userCreated = await AuthService.createUser(req.body);

  res.status(201).json(userCreated);
};

const login = async (req: Request, res: Response) => {
  const isLogged = await AuthService.loginUser(req.body);

  res.json(isLogged);
};

export { register, login };
