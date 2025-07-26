import { Router } from "express";
import {
  addFav,
  deleteAllFavItems,
  deleteFavItems,
  getFav,
} from "../controllers/fav.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();
router.use(authMiddleware);

router.post("/", addFav);
router.get("/", getFav);
router.delete("/:id", deleteFavItems);
router.delete("/", deleteAllFavItems);

export default router;
