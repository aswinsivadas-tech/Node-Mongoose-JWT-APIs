import User from '../models/user.js';
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateToken =(id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET,{ expiresIn:'30d'});
};
const createToken = (id) => {
  return jwt.sign({ id },process.env.JWT_SECRET,{ expiresIn: '3d' });
};



// POST/api/regester
export const registerUser = async (req, res) => {
  const { username,email, password, role, age } = req.body;

 if (!username || !email || !password || !age) {
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


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const isMatch = await user.matchPassword(password);
  console.log(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.json({
    _id: user._id,
    email: user.email,
    token: createToken(user._id),
  });
};
// post /api/login
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   console.log(password);
//   const user = await User.findOne({ email });
//   console.log(user.email,"user");

  
//   if (!user.email || !(await user.matchPassword(password))) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }


//   const token = createToken(user._id);
//   console.log(token);
//   res.status(200).json({ _id: user._id, username: user.username, email, token, role: user.role });
  
  
// };

// getusers
export const getUsers = async (req, res, next) =>{
  try {
    const query ={};

    // Age filter (convert to number)
    if(req.query.age) {
      query.age = Number(req.query.age);
    }
  // role filter( case-insensitive and trim spaces)
  if(req.query.role) {
    query.role ={$regex: new RegExp(`^${req.query.role.trim()}$`, 'i') };
  }

 console.log("Final Query:", query); // Debugging
const users= await User.find(query).select('-password');

// to know is users of that age do not exist message
if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

res.json(users);
  }catch(error){
    next(error);
  }
};



// get single user by id: /api/users/:id(public)
export const getUserByIdpublic = async (req, res, next) => {
  try {
    const userId = req.params.id.trim();
    //1️⃣ Validate ID format
    if(!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message:"Invalid user ID format" });
    }
    // 2️⃣ Find user, exclude password
    const user = await User.findById(userId).select('-password');

    // 3️⃣ Handle not found
    if(!user){
      return res.status(404).json({ message: `User with ID ${userId} not found`});
    }

   // 4️⃣ Return user
    res.status(200).json(user);
  }catch(error){
    next(error);
  }
}