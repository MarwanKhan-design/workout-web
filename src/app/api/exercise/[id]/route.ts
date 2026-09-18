export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { toNextHandler } from "@/lib/api-handler";
import * as exerciseController from "@/controllers/Exercise";
import { requireAdmin } from "@/lib/requireAdmin";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  return toNextHandler(exerciseController.getExerciseById)(req, context);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  return requireAdmin(exerciseController.updateExercise)(req, context);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  return requireAdmin(exerciseController.deleteExercise)(req, context);
}
