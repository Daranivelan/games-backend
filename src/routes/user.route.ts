import { Router } from "express";
import {
  createUser,
  getCurrentUser,
  loginUser,
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/current", authMiddleware, getCurrentUser);

export default router;
