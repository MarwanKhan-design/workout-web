import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import * as userController from "@/controllers/User";

function toNextHandler(controller: any) {
  return async (req: NextRequest) => {
    await dbConnect();
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
    await controller({ cookies, headers }, res);
    return NextResponse.json(jsonData, { status });
  };
}

export const GET = toNextHandler(userController.getCurrentUser);
