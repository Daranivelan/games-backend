"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fav = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FavSchema = new mongoose_1.default.Schema({
    game: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Game",
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
exports.Fav = mongoose_1.default.model("Fav", FavSchema);
