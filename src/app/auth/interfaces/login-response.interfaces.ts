import { User } from "./user.interfaces";

export interface LoginResponse {
  user:  User;
  token: string;
}
