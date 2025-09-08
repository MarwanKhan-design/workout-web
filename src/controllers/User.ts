import jwt from "jsonwebtoken";

// Logout user (clear cookie)
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// Get current user from JWT token in cookie
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const token =
      req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not set");
    const decoded = jwt.verify(token, secret) as { sub: string };
    const user = await User.findById(decoded.sub).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
import { Request, Response } from "express";
import User from "../models/User";

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }
    // Create user (password will be hashed by pre-save hook)
    const user = new User({
      name,
      email,
      passwordHash: password,
      age,
    });
    await user.save();
    const token = user.generateJWT();
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
      .status(201)
      .json({ token, user: { id: user._id, name, email, age } });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: (err as Error).message });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = user.generateJWT();
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
      .json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          age: user.age,
        },
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Login failed", error: (err as Error).message });
  }
};
