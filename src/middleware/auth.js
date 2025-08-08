"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const KEY = process.env.JWT_SECRET;
const authMiddleware = (req, // initially empty user = null
res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = bearerToken.split(" ")[1];
    const encoded = jsonwebtoken_1.default.verify(token, KEY);
    req.user = encoded;
    console.log(encoded);
    next();
};
exports.authMiddleware = authMiddleware;
