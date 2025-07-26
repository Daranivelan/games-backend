import { Request, Response } from "express";
import { Fav } from "../models/fav.model";

export const addFav = async (req: Request, res: Response) => {
  const { gameId } = req.body;
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user._id;

  try {
    const fav = new Fav({ game: gameId, user: userId });
    console.log("Favourite item created:", fav);

    await fav.save();
    console.log("Favourite item saved successfully");
    res.status(201).json({ message: "Added to Favourites" });
  } catch (error) {
    console.error("Error adding to favourites:", error);
    res.status(400).json({ message: "Error", error: error });
  }
};

export const getFav = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user._id;
  try {
    const favs = await Fav.find({ user: userId });
    const favIds = favs.map((fav) => fav.game);
    console.log("Favourite IDs:", favIds);

    res.status(200).json({ gameIds: favIds });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to fetch Favourites", error: error });
  }
};

export const deleteFavItems = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user._id;
  console.log("User ID:", userId);
  console.log("Game ID:", id);

  try {
    const game = await Fav.findOneAndDelete({ game: id, user: userId });
    console.log(game);

    if (!game) {
      return res.status(404).json({ message: "Favourite item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to delete Favourite Item", error: error });
  }
};

export const deleteAllFavItems = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user._id;

  try {
    await Fav.deleteMany({ user: userId });
    res
      .status(200)
      .json({ message: "All Favourite items deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to delete all Favourite items", error: error });
  }
};
