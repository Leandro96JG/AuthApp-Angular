import { User } from "./user.interfaces";

export interface RegisterResponse {
  user:  User;
  token: string;
}


