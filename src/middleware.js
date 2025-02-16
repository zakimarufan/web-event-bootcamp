import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Get token and user from cookies
  const token = request.cookies.get('token');
  const userStr = request.cookies.get('user');
  
  let user = null;
  try {
    user = userStr ? JSON.parse(userStr.value) : null;
  } catch (error) {
    console.error('Error parsing user cookie:', error);
  }

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!token || !user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Protect admin routes
    if (pathname.startsWith('/dashboard/admin') && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard/events', request.url));
    }
  }

  // Redirect authenticated users away from login/register pages
  if ((pathname === '/login' || pathname === '/daftar') && token && user) {
    return NextResponse.redirect(
      new URL(
        user.role === 'admin' ? '/dashboard/admin/reports' : '/dashboard/events',
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/daftar',
  ],
};
