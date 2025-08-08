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
exports.searchGames = exports.getGameById = exports.getGames = void 0;
const game_model_1 = require("../models/game.model");
const getGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield game_model_1.Game.find().limit(10); // Fetch first 10 games
        res.status(200).json({ data: games });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching games" });
    }
});
exports.getGames = getGames;
const getGameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const game = yield game_model_1.Game.find({ _id: id });
        if (!game) {
            return res.status(404).json({ message: "Game not found" });
        }
        res.status(200).json({ data: game });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching game" });
    }
});
exports.getGameById = getGameById;
const searchGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    console.log("name" + name);
    try {
        const game = yield game_model_1.Game.find({ Name: { $regex: name, $options: "i" } });
        return res.status(200).json({ message: "Searched Games", data: game });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Error Finding game", error: error });
    }
});
exports.searchGames = searchGames;
