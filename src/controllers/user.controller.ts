import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User as IUser } from "../types/auth";

dotenv.config();
const KEY = process.env.JWT_SECRET as string;

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exists" });
    }
    const confirmPassword = bcrypt.compare(password, user.password);
    if (!confirmPassword) {
      return res.status(400).json({ message: "Enter the Correct Password" });
    }
    const data: Omit<IUser, "password"> = {
      _id: user._id.toString(),
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
    };
    const token = jwt.sign(data, KEY);
    res.status(201).json({ message: "Login successful", token, user: data });
  } catch (error) {
    res.status(500).json({
      message: "Error Loging user",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// export const getCurrentUser = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "User doesn't Exist",
//       error: error instanceof Error ? error.message : String(error),
//     });
//   }
// };
