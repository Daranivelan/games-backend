import e, { Router } from "express";
import {
  getReview,
  addReview,
  deleteReview,
  updateReview,
} from "../controllers/review.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();
router.use(authMiddleware);

router.get("/:gameId", getReview);
router.post("/:gameId", addReview);
router.delete("/:reviewId", deleteReview);
router.put("/:reviewId", updateReview);

export default router;
