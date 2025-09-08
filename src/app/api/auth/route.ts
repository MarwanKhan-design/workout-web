import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import * as userController from "@/controllers/User";

type CookieOptions = Parameters<typeof NextResponse.prototype.cookies.set>[2]; // extract correct type from NextResponse

type CookieToSet = {
  name: string;
  value: string;
  options?: CookieOptions;
};

function toNextHandler(controller: any) {
  return async (req: NextRequest) => {
    await dbConnect();

    // Adapt request
    const body = req.method === "GET" ? {} : await req.json().catch(() => ({}));
    const cookiesArr = req.cookies.getAll();
    const cookies = Object.fromEntries(
      cookiesArr.map((c) => [c.name, c.value])
    );
    const headers = Object.fromEntries(req.headers.entries());

    // Response placeholders
    let status = 200;
    let jsonData: any = {};
    let cookieToSet: CookieToSet | null = null;
    let cookieToClear: string | null = null;

    const res = {
      status(code: number) {
        status = code;
        return this;
      },
      json(data: any) {
        jsonData = data;
        return this;
      },
      cookie(name: string, value: string, options?: CookieOptions) {
        cookieToSet = { name, value, options };
        return this;
      },
      clearCookie(name: string) {
        cookieToClear = name;
        return this;
      },
    };

    await controller({ body, cookies, headers }, res);

    // Build NextResponse
    const response = NextResponse.json(jsonData, { status });

    if (cookieToSet !== null) {
      const { name, value, options } = cookieToSet as CookieToSet;
      response.cookies.set(name, value, options ?? {});
    }

    if (cookieToClear !== null) {
      response.cookies.set(cookieToClear, "", { maxAge: -1 });
    }

    return response;
  };
}

export const POST = async (req: NextRequest) => {
  const url = req.nextUrl.pathname;
  if (url.endsWith("/register"))
    return toNextHandler(userController.register)(req);
  if (url.endsWith("/login")) return toNextHandler(userController.login)(req);
  if (url.endsWith("/logout")) return toNextHandler(userController.logout)(req);
  return NextResponse.json({ message: "Not found" }, { status: 404 });
};

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl.pathname;
  if (url.endsWith("/me"))
    return toNextHandler(userController.getCurrentUser)(req);
  return NextResponse.json({ message: "Not found" }, { status: 404 });
};
