import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.MONGO_URI as string;
// console.log(URL); // avoid logging secrets

export const connectDB = async () => {
  if (!URL) {
    throw new Error("MONGO_URI is not set");
  }

  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(URL);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  }
};
