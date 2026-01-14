import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
interface JwtPayload {
  id: number;
  role: "admin" | "user";
  iat?: number;
  exp?: number;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    if (req.nextUrl.pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/user") && decoded.role !== "user") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
