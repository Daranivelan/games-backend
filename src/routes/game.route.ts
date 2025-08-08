import { Router } from "express";
import {
  getGames,
  getGameById,
  searchGames,
} from "../controllers/game.controller";

const router = Router();

router.get("/", getGames);
router.get("/search", searchGames);
router.get("/:id", getGameById);

export default router;
