import jwt from "jsonwebtoken";

type AuthRequest = {
  cookies?: {
    token?: string;
  };
  headers?: {
    authorization?: string;
  };
};

export function authenticateRequest(req: AuthRequest): string {
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("No token provided");
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET not set");
  }

  try {
    const decoded = jwt.verify(token, secret) as { sub: string };

    if (!decoded.sub) {
      throw new Error("Invalid token");
    }

    return decoded.sub;
  } catch {
    throw new Error("Invalid or expired token");
  }
}
