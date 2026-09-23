import { NextResponse, NextRequest } from "next/server";

/**
 * AFRIVERSE Middleware
 *
 * Authentication for /dashboard routes is handled **client-side** inside each
 * dashboard page via the `afriverse_active_session` localStorage key and the
 * useEffect guard that renders <AccessRestricted /> for non-artisan users.
 *
 * We do NOT block requests here with next-auth JWT checks because:
 *  1. next-auth is not configured — getToken() always returns null.
 *  2. localStorage tokens are unavailable in Edge middleware.
 *
 * The middleware simply passes all requests through; the page-level guard
 * enforces role-based access control after hydration.
 */
export function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

