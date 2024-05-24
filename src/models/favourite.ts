import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    favourite: { type: String, required: true },
  },
  { timestamps: true }
);

const FavouriteModel =
  mongoose.models.favourite || mongoose.model("favourite", schema);

export default FavouriteModel;
