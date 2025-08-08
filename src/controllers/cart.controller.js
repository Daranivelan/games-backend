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
exports.deleteCartItem = exports.getCartItems = exports.addCartItem = void 0;
const cart_model_1 = require("../models/cart.model");
const addCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gameId } = req.body;
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user._id;
    try {
        const cart = new cart_model_1.Cart({ game: gameId, user: userId });
        yield cart.save();
        res.status(201).json({ message: "Added to Cart" });
    }
    catch (error) {
        res.status(400).json({ message: "Error", error: error });
    }
});
exports.addCartItem = addCartItem;
const getCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user._id;
    try {
        const cart = yield cart_model_1.Cart.find({ user: userId });
        const gameIds = cart.map((item) => item.game);
        console.log("Cart Game IDs:", gameIds);
        res.status(200).json({ game: gameIds });
    }
    catch (error) {
        res.status(400).json({ message: "Failed to fetch Cart", error: error });
    }
});
exports.getCartItems = getCartItems;
const deleteCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user._id;
    try {
        const game = yield cart_model_1.Cart.findOneAndDelete({ game: id, user: userId });
        res.status(200).json({ message: "Item deleted successfully" });
        if (!game) {
            return res.status(404).json({ message: "Cart item not found" });
        }
    }
    catch (error) {
        res
            .status(400)
            .json({ message: "Failed to delete Cart Item", error: error });
    }
});
exports.deleteCartItem = deleteCartItem;
