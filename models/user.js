import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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

// hash password before saving 
// userSchema.pre("save",async function(next){
//   if(!this.isModified("password")) return next();
// const salt = await bcrypt.genSalt(10);
// this.password = await bcrypt.hash(this.password, salt);
// next();
// });

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword)
 {

  console.log(enteredPassword,this.password);
  return await bcrypt.compare(enteredPassword, this.password);

  
};

const User = mongoose.model("User", userSchema);
export default User;

