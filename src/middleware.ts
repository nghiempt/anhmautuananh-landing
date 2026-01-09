import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/tai-khoan"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const isLogin = request.cookies.get("isLogin")?.value;

    if (!isLogin) {
      const homeUrl = new URL("/", request.url);
      homeUrl.searchParams.set("openLogin", "true");
      homeUrl.searchParams.set("redirect", pathname);

      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tai-khoan/:path*"],
};
