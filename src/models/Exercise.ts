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
    name: { type: String, required: true, unique: true },
    category: { type: String },
    muscleGroup: { type: String },
    equipment: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const Exercise: Model<IExercise> =
  mongoose.models.Exercise ||
  mongoose.model<IExercise>("Exercise", ExerciseSchema);
export default Exercise;
