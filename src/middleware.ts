import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const PROTECTED = ["/dashboard"];
const AUTH_PAGES = ["/auth/login", "/auth/signup"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("awys_token")?.value;
  const session = token ? await verifyToken(token) : null;

  if (PROTECTED.some((p) => pathname.startsWith(p)) && !session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (AUTH_PAGES.some((p) => pathname.startsWith(p)) && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
