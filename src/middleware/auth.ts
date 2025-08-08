import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../types/auth";

dotenv.config();
const KEY = process.env.JWT_SECRET as string;

export const authMiddleware = (
  req: Request, // initially empty user = null
  res: Response,
  next: NextFunction
) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = bearerToken.split(" ")[1];
  const encoded = jwt.verify(token, KEY) as Omit<User, "password">;
  req.user = encoded;
  console.log(encoded);

  next();
};
