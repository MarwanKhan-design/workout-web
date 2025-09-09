import { Request, Response } from "express";
import WorkoutSession from "../models/WorkoutSession";
import jwt from "jsonwebtoken";

// Create a new workout session (userId must match JWT user)
export const createWorkoutSession = async (req: Request, res: Response) => {
  try {
    const { userId, workoutId, date, exercises } = req.body;
    if (
      !userId ||
      !workoutId ||
      !date ||
      !Array.isArray(exercises) ||
      exercises.length === 0
    ) {
      return res
        .status(400)
        .json({
          message: "userId, workoutId, date, and exercises are required",
        });
    }
    // Get token from cookies or headers
    const token =
      req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
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
    const session = new WorkoutSession({ userId, workoutId, date, exercises });
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to create workout session",
        error: (err as Error).message,
      });
  }
};

// Get all workout sessions
export const getWorkoutSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await WorkoutSession.find();
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
  try {
    const session = await WorkoutSession.findById(req.params.id);
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
  try {
    const { userId, workoutId, date, exercises } = req.body;
    const session = await WorkoutSession.findByIdAndUpdate(
      req.params.id,
      { userId, workoutId, date, exercises },
      { new: true, runValidators: true }
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
  try {
    const session = await WorkoutSession.findByIdAndDelete(req.params.id);
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
