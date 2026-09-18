import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IWorkout extends Document {
  userId: Types.ObjectId;
  name: string;
  description?: string;
  exercises: Types.ObjectId[];
}

const WorkoutSchema: Schema<IWorkout> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    exercises: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Exercise",
          required: true,
        },
      ],
      required: true,
      validate: {
        validator: (value: Types.ObjectId[]) => value.length > 0,
        message: "A workout must contain at least one exercise",
      },
    },
  },
  { timestamps: true },
);

const Workout: Model<IWorkout> =
  mongoose.models.Workout || mongoose.model<IWorkout>("Workout", WorkoutSchema);
export default Workout;
