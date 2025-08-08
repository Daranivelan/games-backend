"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const GameSchema = new mongoose_1.default.Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },
    ReleaseDate: {
        type: Date,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    AboutTheGame: {
        type: String,
        required: true,
    },
    SupportedLanguages: {
        type: String,
        required: true,
    },
    headerImage: {
        type: String,
        required: true,
    },
    developers: {
        type: String,
        required: true,
        trim: true,
    },
    publishers: {
        type: String,
        required: true,
        trim: true,
    },
    Categories: [
        {
            type: String,
            trim: true,
        },
    ],
    Genres: [
        {
            type: String,
            trim: true,
        },
    ],
    Tags: [
        {
            type: String,
            trim: true,
        },
    ],
    Screenshots: [
        {
            type: String,
        },
    ],
    Movies: [
        {
            type: String,
        },
    ],
}, {
    timestamps: true,
});
exports.Game = mongoose_1.default.model("pc-games", GameSchema);
