import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    ReleaseDate: {
      type: Date,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    AboutTheGame: {
      type: String,
      required: true,
    },
    SupportedLanguages: {
      type: String,
      required: true,
    },
    headerImage: {
      type: String,
      required: true,
    },
    developers: {
      type: String,
      required: true,
      trim: true,
    },
    publishers: {
      type: String,
      required: true,
      trim: true,
    },
    Categories: [
      {
        type: String,
        trim: true,
      },
    ],
    Genres: [
      {
        type: String,
        trim: true,
      },
    ],
    Tags: [
      {
        type: String,
        trim: true,
      },
    ],
    Screenshots: [
      {
        type: String,
      },
    ],
    Movies: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Game = mongoose.model("pc-games", GameSchema);
