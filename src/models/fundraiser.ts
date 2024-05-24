import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    fundraiser: { type: String, required: true },
  },
  { timestamps: true }
);

const FundraiserModel =
  mongoose.models.fundraiser || mongoose.model("fundraiser", schema);

export default FundraiserModel;
