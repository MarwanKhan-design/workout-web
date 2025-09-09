import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IWorkout extends Document {
  userId: Types.ObjectId;
  name: string;
  description?: string;
  exercises: Types.ObjectId[];
}

const WorkoutSchema: Schema<IWorkout> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    exercises: [
      { type: Schema.Types.ObjectId, ref: "Exercise", required: true },
    ],
  },
  { timestamps: true }
);

const Workout: Model<IWorkout> =
  mongoose.models.Workout || mongoose.model<IWorkout>("Workout", WorkoutSchema);
export default Workout;
