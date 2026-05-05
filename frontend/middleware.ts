import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/", "/login", "/register", "/verify"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("Middleware check for path:", pathname);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico" ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.some((publicPath) => pathname === publicPath || pathname.startsWith(`${publicPath}/`))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("blogify-token")?.value;

  if (!token) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|_static|favicon.ico).*)"],
};
