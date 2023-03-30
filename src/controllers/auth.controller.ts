import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

const register = async (req: Request, res: Response) => {
  try {
    const userCreated = await AuthService.createUser(req.body);

    if (!userCreated) {
      res.status(500).json({
        error: "There was an error while creating an account",
      });
    } else {
      res.status(201).json({
        message: "User created successfully",
      });
    }
  } catch (error) {
    console.error("There was an error while creating an account", error);

    res.status(500).json({
      error: "There was an error while creating an account",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const isLogged = await AuthService.loginUser(req.body);

    if (!isLogged) {
      res.status(404).json({
        message: "Can't login, validate your credentials",
      });
    } else {
      res.status(200).json({
        token: isLogged,
      });
    }
  } catch (error) {
    console.error("There was an error while login", error);

    res.status(500).json({
      error: "There was an error while login",
    });
  }
};

export { register, login };
