import { NextResponse } from 'next/server'

export function middleware(req) {
  const token =
    req.cookies.get('next-auth.session-token')?.value || req.cookies.get('__Secure-next-auth.session-token')?.value

  const protectedRoutes = ['/dashboard']

  const isProtected = protectedRoutes?.some((route) => req.nextUrl.pathname.startsWith(route))

  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
