import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { USER_TOKEN_COOKIE_KEY } from "./constants/userTokenCookieKey";
import { jwtVerify } from "jose";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/static") &&
    !pathname.startsWith("/__nextjs") &&
    !PUBLIC_FILE.test(pathname)
  ) {
    const token = request.cookies.get(USER_TOKEN_COOKIE_KEY)?.value;
    if (!token && "/" !== pathname) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (token) {
      if ("/" === pathname) {
        return NextResponse.redirect(new URL("/chat", request.url));
      }
      try {
        await jwtVerify(token, new TextEncoder().encode(JWT_SECRET_KEY));
      } catch (e) {
        request.cookies.delete(USER_TOKEN_COOKIE_KEY);
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete(USER_TOKEN_COOKIE_KEY);
        return response;
      }
    }
  }

  return NextResponse.next();
}
