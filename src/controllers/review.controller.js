"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReview = exports.deleteReview = exports.getReview = exports.addReview = void 0;
const review_model_1 = require("../models/review.model");
// Extend Express Request interface to include 'user'
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment, rating, gameId } = req.body;
    if (!comment || !rating || !gameId) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user._id;
    try {
        const review = new review_model_1.Review({
            comment,
            rating,
            game: gameId,
            user: userId,
        });
        yield review.save();
        res.status(201).json({ message: "Review added successfully" });
    }
    catch (error) {
        res.status(400).json({ message: "Error adding review", error });
    }
});
exports.addReview = addReview;
const getReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId } = req.params;
    try {
        const review = yield review_model_1.Review.find({ game: gameId })
            .populate("game")
            .populate("user");
        res.status(200).json({ message: "Review fetched successfully", review });
    }
    catch (error) {
        res.status(400).json({ message: "Error fetching review" });
    }
});
exports.getReview = getReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user._id;
    try {
        const review = yield review_model_1.Review.findOneAndDelete({
            user: userId,
            _id: reviewId,
        });
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ message: "Error deleting review" });
    }
});
exports.deleteReview = deleteReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, comment } = req.body;
    const { reviewId } = req.params;
    if (!rating || !comment || !reviewId) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const review = yield review_model_1.Review.findByIdAndUpdate(reviewId, { rating, comment }, { new: true });
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review updated successfully", review });
    }
    catch (error) {
        res.status(400).json({ message: "Error updating review" });
    }
});
exports.updateReview = updateReview;
