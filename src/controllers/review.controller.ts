import { Request, Response } from "express";
import { Review } from "../models/review.model";

// Extend Express Request interface to include 'user'

export const addReview = async (req: Request, res: Response) => {
  const { comment, rating, gameId } = req.body;

  if (!comment || !rating || !gameId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user._id;
  try {
    const review = new Review({
      comment,
      rating,
      game: gameId,
      user: userId,
    });
    await review.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error adding review", error });
  }
};

export const getReview = async (req: Request, res: Response) => {
  const { gameId } = req.params;
  try {
    const review = await Review.find({ game: gameId })
      .populate("game")
      .populate("user");

    res.status(200).json({ message: "Review fetched successfully", review });
  } catch (error) {
    res.status(400).json({ message: "Error fetching review" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.user._id;
  try {
    const review = await Review.findOneAndDelete({
      user: userId,
      _id: reviewId,
    });
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
  const { reviewId } = req.params;
  if (!rating || !comment || !reviewId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
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
