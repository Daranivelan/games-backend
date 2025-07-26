import { Request, Response } from "express";
import { Review } from "../models/review.model";

// Extend Express Request interface to include 'user'

export const addReview = async (req: Request, res: Response) => {
  const { comment, rating, game_id } = req.body;
  try {
    const review = new Review({
      comment,
      rating,
      game: game_id,
      user: req.user,
    });
    await review.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error adding review", error });
  }
};

export const getReview = async (req: Request, res: Response) => {
  const { game_id } = req.body;
  try {
    const review = await Review.find({ user: req.user, game: game_id });
    res.status(200).json({ message: "Review fetched successfully", review });
  } catch (error) {
    res.status(400).json({ message: "Error fetching review" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const review = await Review.find({ user: req.user, _id: id });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting review" });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  const { rating, comment } = req.body;
  const { id } = req.params;
  try {
    const review = await Review.findByIdAndUpdate(
      id,
      { rating, comment, user: req.user },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(400).json({ message: "Error updating review" });
  }
};
