import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import userRoutes from "./routes/user.route";
import reviewRoutes from "./routes/review.route";
import gameRoutes from "./routes/game.route";
import cartRoutes from "./routes/cart.route";
import favRoutes from "./routes/fav.route";
import cors from "cors";
import { User as IUser } from "./types/auth";
import { VercelRequest, VercelResponse } from "@vercel/node";

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

app.use("/", (req, res) => {
  res.send("Hello from games backend");
});
app.use("/api/auth", userRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/favourites", favRoutes);

// app.listen(3000, () => {
//   connectDB();
//   console.log("App is Running...!");
// });

export default (req: VercelRequest, res: VercelResponse) => {
  app(req as any, res as any); // Express needs Node's req/res
};
