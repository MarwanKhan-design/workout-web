export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { toNextHandler } from "@/lib/api-handler";
import * as workoutSessionController from "@/controllers/WorkoutSession";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  return toNextHandler(workoutSessionController.getWorkoutSessionById)(req, context);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  return toNextHandler(workoutSessionController.updateWorkoutSession)(req, context);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  return toNextHandler(workoutSessionController.deleteWorkoutSession)(req, context);
}
