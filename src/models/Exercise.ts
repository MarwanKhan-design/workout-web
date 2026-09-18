import mongoose, { Document, Model, Schema } from "mongoose";

export interface IExercise extends Document {
  name: string;
  category?: string;
  muscleGroup?: string;
  equipment?: string;
  description?: string;
}

const ExerciseSchema: Schema<IExercise> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },

    category: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    muscleGroup: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    equipment: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true },
);

const Exercise: Model<IExercise> =
  mongoose.models.Exercise ||
  mongoose.model<IExercise>("Exercise", ExerciseSchema);

export default Exercise;
