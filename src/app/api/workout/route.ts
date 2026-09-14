export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { toNextHandler } from "@/lib/api-handler";
import * as workoutController from "@/controllers/Workout";

export async function GET(req: NextRequest) {
  return toNextHandler(workoutController.getWorkouts)(req);
}

export async function POST(req: NextRequest) {
  return toNextHandler(workoutController.createWorkout)(req);
}
