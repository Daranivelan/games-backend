import { Router } from "express";
import { getGames, getGameById } from "../controllers/game.controller";

const router = Router();

router.get("/", getGames);
router.get("/:id", getGameById);

export default router;
