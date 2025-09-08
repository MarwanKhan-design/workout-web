import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import * as exerciseController from "@/controllers/Exercise";

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
    if (req.method === "POST")
      await controller.createExercise({ body, cookies, headers }, res);
    else if (req.method === "GET")
      await controller.getExercises({ cookies, headers }, res);
    else
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    return NextResponse.json(jsonData, { status });
  };
}

export const POST = toNextHandler(exerciseController);
export const GET = toNextHandler(exerciseController);
