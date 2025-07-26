import { Request, Response } from "express";
import { Cart } from "../models/cart.model";

export const addCartItem = async (req: Request, res: Response) => {
  const { gameId } = req.body;
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user._id;
  try {
    const cart = new Cart({ game: gameId, user: userId });
    await cart.save();
    res.status(201).json({ message: "Added to Cart" });
  } catch (error) {
    res.status(400).json({ message: "Error", error: error });
  }
};

export const getCartItems = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user._id;
  try {
    const cart = await Cart.find({ user: userId });
    const gameIds = cart.map((item) => item.game);
    console.log("Cart Game IDs:", gameIds);
    res.status(200).json({ game: gameIds });
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch Cart", error: error });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user._id;
  try {
    const game = await Cart.findOneAndDelete({ game: id, user: userId });
    res.status(200).json({ message: "Item deleted successfully" });
    if (!game) {
      return res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to delete Cart Item", error: error });
  }
};
