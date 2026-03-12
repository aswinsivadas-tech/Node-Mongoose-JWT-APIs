import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1].trim();
    }
    // Or allow token in query param (optional)
    else if (req.query.token) {
      token = req.query.token.trim();
    }

    //  no token found
    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, no token provided" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // fetch user without password

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found, invalid token" });
    }

    // attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.log("JWT Auth Error:", error.message);
    return res
      .status(401)
      .json({ message: "Not authorized, token invalid or expired" });
  }
};

// admin middleware (optional)

export const admin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
