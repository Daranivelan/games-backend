import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user.route";
import reviewRoutes from "./routes/review.route";
import gameRoutes from "./routes/game.route";
import cartRoutes from "./routes/cart.route";
import favRoutes from "./routes/fav.route";
import cors from "cors";
import { User as IUser } from "./types/auth";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/favourites", favRoutes);

app.listen(3000, () => {
  connectDB();
  console.log("App is Running...!");
});
