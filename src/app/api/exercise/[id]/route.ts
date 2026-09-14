export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { toNextHandler } from "@/lib/api-handler";
import * as exerciseController from "@/controllers/Exercise";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  return toNextHandler(exerciseController.getExerciseById)(req, context);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  return toNextHandler(exerciseController.updateExercise)(req, context);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  return toNextHandler(exerciseController.deleteExercise)(req, context);
}
