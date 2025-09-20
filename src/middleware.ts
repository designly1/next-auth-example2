import { type NextRequest, NextResponse } from "next/server";
import authConfig from "@/config/auth-config";
import { verifyJwtTokenEdge } from "./lib/auth/jwt-edge";

const authRoutes = ["/app/*"];

const excludeRoutes = ["/login"];

function matchesWildcard(path: string, pattern: string): boolean {
  if (pattern.endsWith("/*")) {
    const basePattern = pattern.slice(0, -2);
    return path.startsWith(basePattern);
  }
  return path === pattern;
}

function deleteCookiesAndRedirect(url: string) {
  const response = NextResponse.redirect(url);
  response.cookies.delete(authConfig.jwt.cookieParams.name);
  response.cookies.delete(authConfig.jwt.userDataCookieParams.name);
  return response;
}

export async function middleware(request: NextRequest) {
  //! Nice header to have for getting the current path in server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-current-path", request.nextUrl.pathname);

  const LOGIN = `${process.env.NEXT_PUBLIC_BASE_URL}/login?redirect=${
    request.nextUrl.pathname + request.nextUrl.search
  }`;

  if (
    authRoutes.some((pattern) =>
      matchesWildcard(request.nextUrl.pathname, pattern),
    ) &&
    !excludeRoutes.some((pattern) =>
      matchesWildcard(request.nextUrl.pathname, pattern),
    )
  ) {
    const token = request.cookies.get(authConfig.jwt.cookieParams.name);

    // Match API routes
    if (request.nextUrl.pathname.startsWith("/api")) {
      if (!token) {
        const response = {
          success: false,
          message: "Unauthorized",
        };

        return NextResponse.json(response, { status: 401 });
      }
    }

    if (!token) {
      return deleteCookiesAndRedirect(LOGIN);
    }

    try {
      const payload = await verifyJwtTokenEdge(token.value);

      if (!payload) {
        return deleteCookiesAndRedirect(LOGIN);
      }

      if (request.nextUrl.pathname.startsWith("/admin")) {
        if (payload.role !== "admin") {
          return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_BASE_URL}/access-denied`,
          );
        }
      }

      if (request.nextUrl.pathname.startsWith("/api/admin")) {
        if (payload.role !== "admin") {
          const response = {
            success: false,
            message: "Forbidden",
          };
          const res = NextResponse.json(response, { status: 403 });
          return res;
        }
      }
    } catch {
      // Don't redirect to login if we're already on login page
      // Just delete cookies and let the page render
      const response = NextResponse.next();
      response.cookies.delete(authConfig.jwt.cookieParams.name);
      response.cookies.delete(authConfig.jwt.userDataCookieParams.name);
      return response;
    }
  }

  let redirectToApp = false;
  // Redirect login to app if already logged in
  if (request.nextUrl.pathname === "/login") {
    const token = request.cookies.get(authConfig.jwt.cookieParams.name);

    if (token) {
      try {
        const payload = await verifyJwtTokenEdge(token.value);

        if (payload) {
          redirectToApp = true;
        } else {
          // Don't redirect to login if we're already on login page
          // Just delete cookies and let the page render
          const response = NextResponse.next();
          response.cookies.delete(authConfig.jwt.cookieParams.name);
          response.cookies.delete(authConfig.jwt.userDataCookieParams.name);
          return response;
        }
      } catch {
        return deleteCookiesAndRedirect(LOGIN);
      }
    }
  }

  if (redirectToApp) {
    const res = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/app`,
    );
    return res;
  } else {
    const res = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    return res;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
