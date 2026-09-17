import { Request, Response } from "express";
import WorkoutSession from "../models/WorkoutSession";
import jwt from "jsonwebtoken";
import { authenticateRequest } from "@/lib/auth";
import Workout from "@/models/Workout";

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

    res.status(201).json(session);
  } catch (err) {
    throw err;
  }
};

// Get all workout sessions
export const getWorkoutSessions = async (req: Request, res: Response) => {
  const userId = authenticateRequest(req);

  try {
    const sessions = await WorkoutSession.find({ userId });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch workout sessions",
      error: (err as Error).message,
    });
  }
};

// Get workout session by ID
export const getWorkoutSessionById = async (req: Request, res: Response) => {
  const userId = authenticateRequest(req);

  try {
    const session = await WorkoutSession.findOne({
      _id: req.params.id,
      userId,
    });
    if (!session)
      return res.status(404).json({ message: "Workout session not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch workout session",
      error: (err as Error).message,
    });
  }
};

// Update workout session
export const updateWorkoutSession = async (req: Request, res: Response) => {
  const userId = authenticateRequest(req);

  try {
    const { workoutId, date, exercises } = req.body;
    const session = await WorkoutSession.findOneAndUpdate(
      { _id: req.params.id, userId },
      { workoutId, date, exercises },
      { new: true, runValidators: true },
    );
    if (!session)
      return res.status(404).json({ message: "Workout session not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update workout session",
      error: (err as Error).message,
    });
  }
};

// Delete workout session
export const deleteWorkoutSession = async (req: Request, res: Response) => {
  const userId = authenticateRequest(req);
  try {
    const session = await WorkoutSession.findOneAndDelete({
      _id: req.params.id,
      userId,
    });
    if (!session)
      return res.status(404).json({ message: "Workout session not found" });
    res.json({ message: "Workout session deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete workout session",
      error: (err as Error).message,
    });
  }
};
