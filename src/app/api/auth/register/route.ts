import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import * as userController from "@/controllers/User";

function toNextHandler(controller: any) {
  return async (req: NextRequest) => {
    await dbConnect();
    const body = await req.json().catch(() => ({}));
    const cookiesArr = req.cookies.getAll();
    const cookies = Object.fromEntries(
      cookiesArr.map((c) => [c.name, c.value])
    );
    const headers = Object.fromEntries(req.headers.entries());
    let status = 200;
    let jsonData: any = {};
    let cookieToSet: any = null;
    let cookieToClear: any = null;
    const res = {
      status(code: number) {
        status = code;
        return this;
      },
      json(data: any) {
        jsonData = data;
        return this;
      },
      cookie(name: string, value: string, options?: any) {
        cookieToSet = { name, value, options };
        return this;
      },
      clearCookie(name: string) {
        cookieToClear = name;
        return this;
      },
    };
    await controller({ body, cookies, headers }, res);
    const response = NextResponse.json(jsonData, { status });
    if (cookieToSet)
      response.cookies.set(
        cookieToSet.name,
        cookieToSet.value,
        cookieToSet.options ?? {}
      );
    if (cookieToClear) response.cookies.set(cookieToClear, "", { maxAge: -1 });
    return response;
  };
}

export const POST = toNextHandler(userController.register);
