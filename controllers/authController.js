import User from '../models/user.js';

// import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// POST/api/regester
export const registerUser = async (req, res) => {
  const { username,email, password, role, age } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: `please fill all required fields` });
  }
  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
console.log(req.body);
  // include optionl fields role and age
  const user = await User.create({
    username,
    email,
    password,
    role: role || "user",
    age: age || null,
  });

  // Send response
  res.status(201).json({
    _id: user._id,
    username: user.username,
        email: user.email,
    role: user.role,
    age: user.age,
  });
};


// getusers
export const getUsers = async (req, res, next) =>{
  try {
    const query ={};

    // Age filter (convert to number)
    if(req.query.age) {
      query.age = number(req.query.age);
    }
  // role filter( case-insensitive and trim spaces)
  if(req.query.role) {
    query.role ={$regex: new RegExp(`^${req.query.role.trim()}$`, 'i') };
  }

 console.log("Final Query:", query); // Debugging
const users= await User.find(query).select('-password');
res.json(users);
  }catch(error){
    next(error);
  }
};



// get single user by id: /api/users/:id(public)
// export const getUserByIdpublic = async (req, res, next) => {
//   try {
//     const userId = req.parms.id.trim();
//     //1️⃣ Validate ID format
//     if(!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message:"Invalid user ID format" });
//     }
//     // 2️⃣ Find user, exclude password
//     const user = await User.findById(userId).select()
//   }
// }