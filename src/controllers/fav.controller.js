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
exports.deleteAllFavItems = exports.deleteFavItems = exports.getFav = exports.addFav = void 0;
const fav_model_1 = require("../models/fav.model");
const addFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId } = req.body;
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user._id;
    try {
        const fav = new fav_model_1.Fav({ game: gameId, user: userId });
        console.log("Favourite item created:", fav);
        yield fav.save();
        console.log("Favourite item saved successfully");
        res.status(201).json({ message: "Added to Favourites" });
    }
    catch (error) {
        console.error("Error adding to favourites:", error);
        res.status(400).json({ message: "Error", error: error });
    }
});
exports.addFav = addFav;
const getFav = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user._id;
    try {
        const favs = yield fav_model_1.Fav.find({ user: userId });
        const favIds = favs.map((fav) => fav.game);
        console.log("Favourite IDs:", favIds);
        res.status(200).json({ gameIds: favIds });
    }
    catch (error) {
        res
            .status(400)
            .json({ message: "Failed to fetch Favourites", error: error });
    }
});
exports.getFav = getFav;
const deleteFavItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user._id;
    console.log("User ID:", userId);
    console.log("Game ID:", id);
    try {
        const game = yield fav_model_1.Fav.findOneAndDelete({ game: id, user: userId });
        console.log(game);
        if (!game) {
            return res.status(404).json({ message: "Favourite item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully" });
    }
    catch (error) {
        res
            .status(400)
            .json({ message: "Failed to delete Favourite Item", error: error });
    }
});
exports.deleteFavItems = deleteFavItems;
const deleteAllFavItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user._id;
    try {
        yield fav_model_1.Fav.deleteMany({ user: userId });
        res
            .status(200)
            .json({ message: "All Favourite items deleted successfully" });
    }
    catch (error) {
        res
            .status(400)
            .json({ message: "Failed to delete all Favourite items", error: error });
    }
});
exports.deleteAllFavItems = deleteAllFavItems;
