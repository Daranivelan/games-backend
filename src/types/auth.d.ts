import { Request } from "express";

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
};

export interface AuthenticatedRequest extends Request {
  user?: Omit<User, "password">;
}
