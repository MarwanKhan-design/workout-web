export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

// This route is intentionally empty.
// Auth endpoints are handled by dedicated route files:
//   /api/auth/login, /api/auth/logout, /api/auth/register, /api/auth/me
export function GET() {
  return NextResponse.json({ message: "Not found" }, { status: 404 });
}

export function POST() {
  return NextResponse.json({ message: "Not found" }, { status: 404 });
}
