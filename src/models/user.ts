import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.user || mongoose.model("user", schema);

export default UserModel;
