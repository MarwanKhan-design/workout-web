import { Request, Response } from "express";
import Exercise from "../models/Exercise";
import mongoose from "mongoose";

// Create a new exercise
export const createExercise = async (req: Request, res: Response) => {
  try {
    const { name, category, muscleGroup, equipment, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const existing = await Exercise.findOne({ name: name.trim() });

    if (existing) {
      return res.status(409).json({
        message: "Exercise name must be unique",
      });
    }

    const exercise = new Exercise({
      name,
      category,
      muscleGroup,
      equipment,
      description,
    });

    await exercise.save();

    return res.status(201).json(exercise);
  } catch (err: any) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({
        message: "Invalid exercise data",
      });
    }

    console.error("Create exercise error:", err);

    return res.status(500).json({
      message: "Failed to create exercise",
    });
  }
};

// Get all exercises
export const getExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await Exercise.find();

    return res.json(exercises);
  } catch (err) {
    console.error("Get exercises error:", err);

    return res.status(500).json({
      message: "Failed to fetch exercises",
    });
  }
};

// Get exercise by ID
export const getExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid exercise ID",
      });
    }

    const exercise = await Exercise.findById(id);

    if (!exercise) {
      return res.status(404).json({
        message: "Exercise not found",
      });
    }

    return res.json(exercise);
  } catch (err) {
    console.error("Get exercise error:", err);

    return res.status(500).json({
      message: "Failed to fetch exercise",
    });
  }
};

// Update exercise
export const updateExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid exercise ID",
      });
    }

    const { name, category, muscleGroup, equipment, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const exercise = await Exercise.findByIdAndUpdate(
      id,
      {
        name,
        category,
        muscleGroup,
        equipment,
        description,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!exercise) {
      return res.status(404).json({
        message: "Exercise not found",
      });
    }

    return res.json(exercise);
  } catch (err: any) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({
        message: "Invalid exercise data",
      });
    }

    console.error("Update exercise error:", err);

    return res.status(500).json({
      message: "Failed to update exercise",
    });
  }
};

// Delete exercise
export const deleteExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid exercise ID",
      });
    }

    const exercise = await Exercise.findByIdAndDelete(id);

    if (!exercise) {
      return res.status(404).json({
        message: "Exercise not found",
      });
    }

    return res.json({
      message: "Exercise deleted",
    });
  } catch (err) {
    console.error("Delete exercise error:", err);

    return res.status(500).json({
      message: "Failed to delete exercise",
    });
  }
};
