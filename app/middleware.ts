import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('next-auth.session-token');
  const { pathname } = req.nextUrl;

  // Redirect to login if the user is not logged in and trying to access the dashboard
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If the user is logged in, you can optionally redirect them to the dashboard if they're on the login page
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

// Tell Next.js which routes this middleware should apply to
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
