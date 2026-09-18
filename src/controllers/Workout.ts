import { Request, Response } from "express";
import Workout from "../models/Workout";
import { authenticateRequest } from "@/lib/auth";
import mongoose from "mongoose";
import Exercise from "@/models/Exercise";

// Create a new workout (userId must match JWT user)
export const createWorkout = async (req: Request, res: Response) => {
  const userId = authenticateRequest(req);
  try {
    const { name, description, exercises } = req.body;

    if (!name || !Array.isArray(exercises) || exercises.length === 0) {
      return res
        .status(400)
        .json({ message: "name, and exercises are required" });
    }
    const invalidExerciseId = exercises.some(
      (exerciseId: string) => !mongoose.isValidObjectId(exerciseId),
    );

    if (invalidExerciseId) {
      return res.status(400).json({
        message: "One or more exercise IDs are invalid",
      });
    }

    const existingExercises = await Exercise.find({
      _id: { $in: exercises },
    }).select("_id");

    if (existingExercises.length !== exercises.length) {
      return res.status(400).json({
        message: "One or more exercises do not exist",
      });
    }

    const workout = new Workout({ userId, name, description, exercises });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    console.error("Create workout error:", err);

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
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid workout ID",
      });
    }
    const workout = await Workout.findOne({ _id: id, userId });
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  } catch (err) {
    console.error("Get workout by id error:", err);

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
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid workout ID",
      });
    }

    const { name, description, exercises } = req.body;

    if (!name || !Array.isArray(exercises) || exercises.length === 0) {
      return res
        .status(400)
        .json({ message: "name, and exercises are required" });
    }

    const invalidExerciseId = exercises.some(
      (exerciseId: string) => !mongoose.isValidObjectId(exerciseId),
    );

    if (invalidExerciseId) {
      return res.status(400).json({
        message: "One or more exercise IDs are invalid",
      });
    }

    const existingExercises = await Exercise.find({
      _id: { $in: exercises },
    }).select("_id");

    if (existingExercises.length !== exercises.length) {
      return res.status(400).json({
        message: "One or more exercises do not exist",
      });
    }
    const workout = await Workout.findOneAndUpdate(
      { _id: id, userId },
      { userId, name, description, exercises },
      { new: true, runValidators: true },
    );
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json(workout);
  } catch (err) {
    console.error("update workout error:", err);

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
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid workout ID",
      });
    }
    const workout = await Workout.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.json({ message: "Workout deleted" });
  } catch (err) {
    console.error("delete workout error:", err);

    res.status(500).json({
      message: "Failed to delete workout",
      error: (err as Error).message,
    });
  }
};
