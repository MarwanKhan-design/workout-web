import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import * as workoutController from "@/controllers/Workout";

function toNextHandler(controller: any) {
  return async (req: NextRequest) => {
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
    if (req.method === "POST") {
      // Pass token from cookies or headers to controller
      const token = cookies.token || headers["authorization"]?.split(" ")[1];
      await controller.createWorkout(
        { body: { ...body, token }, cookies, headers },
        res
      );
    } else if (req.method === "GET") {
      await controller.getWorkouts({ cookies, headers }, res);
    } else {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }
    return NextResponse.json(jsonData, { status });
  };
}

export const POST = toNextHandler(workoutController);
export const GET = toNextHandler(workoutController);
