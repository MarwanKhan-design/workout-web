import { Request, Response } from "express";
import Workout from "../models/Workout";
import jwt from "jsonwebtoken";
import { authenticateRequest } from "@/lib/auth";

// Create a new workout (userId must match JWT user)
export const createWorkout = async (req: Request, res: Response) => {
  const userId = authenticateRequest(req);
  try {
    const { name, description, exercises } = req.body;
    if (!name || !Array.isArray(exercises) || exercises.length === 0) {
      return res
        .status(400)
        .json({ message: "userId, name, and exercises are required" });
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
  const userId = authenticateRequest(req);
  const workouts = await Workout.find({ userId });
  res.json(workouts);
};
// Get workout by ID
export const getWorkoutById = async (req: Request, res: Response) => {
  const userId = authenticateRequest(req);
  try {
    const workout = await Workout.findOne({ _id: req.params.id, userId });
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
  const userId = authenticateRequest(req);
  try {
    const { name, description, exercises } = req.body;
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId },
      { userId, name, description, exercises },
      { new: true, runValidators: true },
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
  const userId = authenticateRequest(req);
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId,
    });
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json({ message: "Workout deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete workout",
      error: (err as Error).message,
    });
  }
};
