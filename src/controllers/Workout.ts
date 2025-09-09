import { Request, Response } from "express";
import Workout from "../models/Workout";
import jwt from "jsonwebtoken";

// Create a new workout (userId must match JWT user)
export const createWorkout = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      name,
      description,
      exercises,
      token: tokenFromBody,
    } = req.body;
    if (
      !userId ||
      !name ||
      !Array.isArray(exercises) ||
      exercises.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "userId, name, and exercises are required" });
    }
    // Get token from cookies or headers
    const token =
      tokenFromBody ||
      req.cookies?.token ||
      req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not set");
    let decoded: any;
    try {
      decoded = jwt.verify(token, secret);
    } catch {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    if (!decoded.sub || decoded.sub !== userId) {
      return res
        .status(403)
        .json({ message: "userId does not match authenticated user" });
    }
    const workout = new Workout({ userId, name, description, exercises });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create workout",
      error: (err as Error).message,
    });
  }
};

// Get all workouts
export const getWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch workouts",
      error: (err as Error).message,
    });
  }
};

// Get workout by ID
export const getWorkoutById = async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch workout",
      error: (err as Error).message,
    });
  }
};

// Update workout
export const updateWorkout = async (req: Request, res: Response) => {
  try {
    const { userId, name, description, exercises } = req.body;
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { userId, name, description, exercises },
      { new: true, runValidators: true }
    );
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update workout",
      error: (err as Error).message,
    });
  }
};

// Delete workout
export const deleteWorkout = async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json({ message: "Workout deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete workout",
      error: (err as Error).message,
    });
  }
};
