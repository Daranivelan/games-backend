"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const user_route_1 = __importDefault(require("./routes/user.route"));
const review_route_1 = __importDefault(require("./routes/review.route"));
const game_route_1 = __importDefault(require("./routes/game.route"));
const cart_route_1 = __importDefault(require("./routes/cart.route"));
const fav_route_1 = __importDefault(require("./routes/fav.route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", user_route_1.default);
app.use("/api/review", review_route_1.default);
app.use("/api/games", game_route_1.default);
app.use("/api/cart", cart_route_1.default);
app.use("/api/favourites", fav_route_1.default);
app.listen(3000, () => {
    (0, db_1.connectDB)();
    console.log("App is Running...!");
});
