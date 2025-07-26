import { Request, Response } from "express";
import { Game } from "../models/game.model";

export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await Game.find().limit(10); // Fetch first 10 games

    res.status(200).json({ data: games });
  } catch (error) {
    res.status(500).json({ message: "Error fetching games" });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const game = await Game.find({ _id: id });
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json({ data: game });
  } catch (error) {
    res.status(500).json({ message: "Error fetching game" });
  }
};
