import { Router } from "express";
import {
  addCartItem,
  getCartItems,
  deleteCartItem,
} from "../controllers/cart.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();
router.use(authMiddleware);

router.post("/", addCartItem);
router.get("/", getCartItems);
router.delete("/:id", deleteCartItem);

export default router;
