import { IAuth } from "./auth.interface";

export interface IUser extends IAuth {
  id: number;
  name: string;
  lastname: string;
}
