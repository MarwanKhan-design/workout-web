import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IWorkoutSessionExercise {
  exercise: Types.ObjectId;
  sets?: { reps: number; weight: number; duration: number }[];
}

export interface IWorkoutSession extends Document {
  userId: Types.ObjectId;
  workoutId: Types.ObjectId;
  date: Date;
  exercises: IWorkoutSessionExercise[];
}

const RepsSchema = new Schema({
  reps: { type: Number },
  weight: { type: Number },
  duration: { type: Number },
});

const WorkoutSessionExerciseSchema = new Schema<IWorkoutSessionExercise>(
  {
    exercise: { type: Schema.Types.ObjectId, ref: "Exercise", required: true },
    sets: { type: [RepsSchema] },
  },
  { _id: false }
);

const WorkoutSessionSchema: Schema<IWorkoutSession> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    workoutId: { type: Schema.Types.ObjectId, ref: "Workout", required: true },
    date: { type: Date, required: true },
    exercises: { type: [WorkoutSessionExerciseSchema], required: true },
  },
  { timestamps: true }
);

const WorkoutSession: Model<IWorkoutSession> =
  mongoose.models.WorkoutSession ||
  mongoose.model<IWorkoutSession>("WorkoutSession", WorkoutSessionSchema);
export default WorkoutSession;
