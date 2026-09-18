import { Request, Response } from "express";
import WorkoutSession from "../models/WorkoutSession";
import { authenticateRequest } from "@/lib/auth";
import Workout from "@/models/Workout";
import mongoose from "mongoose";
// Create a new workout session (userId must match JWT user)
export const createWorkoutSession = async (req: Request, res: Response) => {
  const userId = authenticateRequest(req);

  try {
    const { workoutId, date, exercises } = req.body;

    if (
      !workoutId ||
      !date ||
      !Array.isArray(exercises) ||
      exercises.length === 0
    ) {
      return res.status(400).json({
        message: "Workout, date, and exercises are required",
      });
    }

    if (!mongoose.isValidObjectId(workoutId)) {
      return res.status(400).json({
        message: "Invalid workout ID",
      });
    }

    const workout = await Workout.findOne({
      _id: workoutId,
      userId,
    });

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    const session = new WorkoutSession({
      userId,
      workoutId,
      date,
      exercises,
    });

    await session.save();

    return res.status(201).json(session);
  } catch (err: any) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({
        message: "Invalid workout session data",
      });
    }

    console.error("Create workout session error:", err);

    return res.status(500).json({
      message: "Failed to create workout session",
    });
  }
};

// Get all workout sessions
export const getWorkoutSessions = async (req: Request, res: Response) => {
  const userId = authenticateRequest(req);

  try {
    const sessions = await WorkoutSession.find({ userId });
    res.json(sessions);
  } catch (err) {
    console.error("Get workout sessions error:", err);

    return res
      .status(500)
      .json({ message: "Failed to fetch workout sessions" });
  }
};
// Get workout session by ID
export const getWorkoutSessionById = async (req: Request, res: Response) => {
  const userId = authenticateRequest(req);

  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid workout session ID",
      });
    }
    const session = await WorkoutSession.findOne({
      _id: id,
      userId,
    });
    if (!session)
      return res.status(404).json({ message: "Workout session not found" });
    res.json(session);
  } catch (err) {
    console.error("Get workout sessions error:", err);

    return res.status(500).json({ message: "Failed to fetch workout session" });
  }
};

// Update workout session
export const updateWorkoutSession = async (req: Request, res: Response) => {
  const userId = authenticateRequest(req);

  try {
    const { id } = req.params;
    const { workoutId, date, exercises } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid workout session ID",
      });
    }

    if (
      !workoutId ||
      !date ||
      !Array.isArray(exercises) ||
      exercises.length === 0
    ) {
      return res.status(400).json({
        message: "Workout, date, and exercises are required",
      });
    }

    if (!mongoose.isValidObjectId(workoutId)) {
      return res.status(400).json({
        message: "Invalid workout ID",
      });
    }

    const workout = await Workout.findOne({
      _id: workoutId,
      userId,
    });

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }
    const session = await WorkoutSession.findOneAndUpdate(
      { _id: id, userId },
      { workoutId, date, exercises },
      { new: true, runValidators: true },
    );
    if (!session)
      return res.status(404).json({ message: "Workout session not found" });
    res.json(session);
  } catch (err: any) {

    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({
        message: "Invalid workout session data",
      });
    }

    console.error("Update workout session error:", err);

    return res.status(500).json({
      message: "Failed to update workout session",
    });
  }
};

// Delete workout session
export const deleteWorkoutSession = async (req: Request, res: Response) => {
  const userId = authenticateRequest(req);
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid workout session ID",
      });
    }
    const session = await WorkoutSession.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!session)
      return res.status(404).json({ message: "Workout session not found" });
    res.json({ message: "Workout session deleted" });
  } catch (err) {
    console.error("Get workout sessions error:", err);

    return res
      .status(500)
      .json({ message: "Failed to delete workout sessions" });
  }
};
