import { Request } from "express";

export type User = {
  _id: string;
  username: string;
  email: string;
  password?: string;
  createdAt: Date;
};

declare module "express-serve-static-core" {
  interface Request {
    user?: Omit<User, "password">;
  }
}
