import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.url;
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // Redirect to login if no token
    if (url.includes('/admin')) {
      return NextResponse.redirect(new URL('/login', url));
    }
    return NextResponse.next();
  }

  // Verify the token by calling the /api/verifyAuth endpoint
  const verifyUrl = new URL('/api/verifyAuth', url);
  const response = await fetch(verifyUrl.toString(), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  const { valid } = await response.json();

  // Redirect based on verification result
  if (url.includes('/admin') && !valid) {
    return NextResponse.redirect(new URL('/login', url));
  }

  if (url.includes('/login') && valid) {
    return NextResponse.redirect(new URL('/admin/dashboard', url));
  }

  return NextResponse.next();
}
