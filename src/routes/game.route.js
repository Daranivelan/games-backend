"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const game_controller_1 = require("../controllers/game.controller");
const router = (0, express_1.Router)();
router.get("/", game_controller_1.getGames);
router.get("/search", game_controller_1.searchGames);
router.get("/:id", game_controller_1.getGameById);
exports.default = router;
