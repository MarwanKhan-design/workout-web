export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { toNextHandler } from "@/lib/api-handler";
import * as workoutSessionController from "@/controllers/WorkoutSession";

export async function GET(req: NextRequest) {
  return toNextHandler(workoutSessionController.getWorkoutSessions)(req);
}

export async function POST(req: NextRequest) {
  return toNextHandler(workoutSessionController.createWorkoutSession)(req);
}
