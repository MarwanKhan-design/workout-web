import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";

type CookieOptions = Parameters<typeof NextResponse.prototype.cookies.set>[2];

type CookieToSet = {
  name: string;
  value: string;
  options?: CookieOptions;
};

/**
 * Wraps an Express-style controller into a Next.js App Router handler.
 * Handles DB connection, request adaptation, response adaptation, and
 * returns a well-formed JSON error response if anything throws.
 */
export function toNextHandler(controller: any) {
  return async (
    req: NextRequest,
    context?: { params?: Record<string, string> },
  ) => {
    try {
      await dbConnect();

      const body =
        req.method === "GET" ? {} : await req.json().catch(() => ({}));
      const cookiesArr = req.cookies.getAll();
      const cookies = Object.fromEntries(
        cookiesArr.map((c) => [c.name, c.value]),
      );
      const headers = Object.fromEntries(req.headers.entries());
      const params = context?.params ?? {};

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

      await controller({ body, cookies, headers, params }, res);

      const response = NextResponse.json(jsonData, { status });

      if (cookieToSet !== null) {
        const { name, value, options } = cookieToSet as CookieToSet;
        response.cookies.set(name, value, options ?? {});
      }
      if (cookieToClear !== null) {
        response.cookies.set(cookieToClear, "", { maxAge: -1 });
      }

      return response;
    } catch (err: any) {
      console.error("[API Error]", err);
      const message = err?.message ?? "Internal server error";

      if (
        message === "No token provided" ||
        message === "Invalid or expired token"
      ) {
        return NextResponse.json({ message }, { status: 401 });
      }

      return NextResponse.json({ message }, { status: 500 });
    }
  };
}
