export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { toNextHandler } from "@/lib/api-handler";
import * as exerciseController from "@/controllers/Exercise";
import { requireAdmin } from "@/lib/requireAdmin";

const handler = toNextHandler({
  GET: exerciseController.getExercises,
  POST: exerciseController.createExercise,
});

export async function GET(req: NextRequest) {
  return toNextHandler(exerciseController.getExercises)(req);
}

export async function POST(req: NextRequest) {
  return requireAdmin(toNextHandler(exerciseController.createExercise))(req);
}
