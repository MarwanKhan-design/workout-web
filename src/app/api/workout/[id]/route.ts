export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { toNextHandler } from "@/lib/api-handler";
import * as workoutController from "@/controllers/Workout";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  return toNextHandler(workoutController.getWorkoutById)(req, context);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  return toNextHandler(workoutController.updateWorkout)(req, context);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  return toNextHandler(workoutController.deleteWorkout)(req, context);
}
