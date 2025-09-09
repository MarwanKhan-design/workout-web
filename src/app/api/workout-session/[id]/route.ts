import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import * as workoutSessionController from "@/controllers/WorkoutSession";

function toNextHandler(controller: any) {
  return async (req: NextRequest, { params }: { params: { id: string } }) => {
    await dbConnect();
    const body = req.method === "GET" ? {} : await req.json().catch(() => ({}));
    const cookiesArr = req.cookies.getAll();
    const cookies = Object.fromEntries(
      cookiesArr.map((c) => [c.name, c.value])
    );
    const headers = Object.fromEntries(req.headers.entries());
    let status = 200;
    let jsonData: any = {};
    const res = {
      status(code: number) {
        status = code;
        return this;
      },
      json(data: any) {
        jsonData = data;
        return this;
      },
    };
    if (req.method === "GET")
      await controller.getWorkoutSessionById(
        { params: { id: params.id }, cookies, headers },
        res
      );
    else if (req.method === "PUT")
      await controller.updateWorkoutSession(
        { params: { id: params.id }, body, cookies, headers },
        res
      );
    else if (req.method === "DELETE")
      await controller.deleteWorkoutSession(
        { params: { id: params.id }, cookies, headers },
        res
      );
    else
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    return NextResponse.json(jsonData, { status });
  };
}

export const GET = toNextHandler(workoutSessionController);
export const PUT = toNextHandler(workoutSessionController);
export const DELETE = toNextHandler(workoutSessionController);
