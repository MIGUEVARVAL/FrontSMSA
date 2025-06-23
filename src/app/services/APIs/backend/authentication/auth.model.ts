import { User } from "../models/User/user.model";

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}