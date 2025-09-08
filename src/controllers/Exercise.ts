import { Request, Response } from "express";
import Exercise from "../models/Exercise";

// Create a new exercise
export const createExercise = async (req: Request, res: Response) => {
  try {
    const { name, category, muscleGroup, equipment, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const existing = await Exercise.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: "Exercise name must be unique" });
    }
    const exercise = new Exercise({
      name,
      category,
      muscleGroup,
      equipment,
      description,
    });
    await exercise.save();
    res.status(201).json(exercise);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to create exercise",
        error: (err as Error).message,
      });
  }
};

// Get all exercises
export const getExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to fetch exercises",
        error: (err as Error).message,
      });
  }
};

// Get exercise by ID
export const getExerciseById = async (req: Request, res: Response) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise)
      return res.status(404).json({ message: "Exercise not found" });
    res.json(exercise);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to fetch exercise",
        error: (err as Error).message,
      });
  }
};

// Update exercise
export const updateExercise = async (req: Request, res: Response) => {
  try {
    const { name, category, muscleGroup, equipment, description } = req.body;
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      { name, category, muscleGroup, equipment, description },
      { new: true, runValidators: true }
    );
    if (!exercise)
      return res.status(404).json({ message: "Exercise not found" });
    res.json(exercise);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to update exercise",
        error: (err as Error).message,
      });
  }
};

// Delete exercise
export const deleteExercise = async (req: Request, res: Response) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise)
      return res.status(404).json({ message: "Exercise not found" });
    res.json({ message: "Exercise deleted" });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to delete exercise",
        error: (err as Error).message,
      });
  }
};
