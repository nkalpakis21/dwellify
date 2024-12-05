import { NextResponse } from 'next/server';
import { useAuth } from './lib/AuthContext';

export default async function middleware(req: any) {
  const auth = useAuth();
  const token = await auth.user?.getIdToken();
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'], // Protect the dashboard route
};
