import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    email: { type: String, required: true, unique: true },
    age: {
      type: Number,
      required: true,
      min: 5,
      max: 25,
    },
    password: { type: String, required: true },
    role: { type: String, default: "User" },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
