import { NextRequest, NextResponse } from "next/server";
import User from "../models/User";
import { authenticateRequest } from "@/lib/auth";
import { toNextHandler } from "@/lib/api-handler";

export const requireAdmin = (
  controller: (req: any, res: any) => Promise<any>,
) => {
  return async (req: NextRequest, context?: any) => {
    try {
      const authRequest = {
        cookies: {
          token: req.cookies.get("token")?.value,
        },
        headers: {
          authorization: req.headers.get("authorization") ?? undefined,
        },
      };

      const userId = authenticateRequest(authRequest);

      const user = await User.findById(userId).select("role");

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 },
        );
      }

      if (user.role !== "admin") {
        return NextResponse.json(
          { message: "Admin access required" },
          { status: 403 },
        );
      }

      return toNextHandler(controller)(req, context);
    } catch (err) {
      console.error("Admin authorization error:", err);

      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 },
      );
    }
  };
};
