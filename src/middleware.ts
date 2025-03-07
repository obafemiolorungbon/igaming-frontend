import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// cookie utils
import { COOKIE_KEYS } from './utils/cookie'
import { ROUTES } from './config/routes'

export const middleware = (request: NextRequest) => {
  // Get the JWT token from cookies
  const token = request.cookies.get(COOKIE_KEYS.ACCESS_COOKIE)
  const { pathname } = request.nextUrl

  // Redirect to register if no token is present
  if (token?.value && pathname.startsWith('/auth')) {
    const dashboardURL = new URL(ROUTES.app.dashboard, request.url)
    return NextResponse.redirect(dashboardURL)
  }

  // Allow access to public paths even without token
  if (!token?.value && pathname.startsWith('/app')) {
    const loginURL = new URL(ROUTES.auth.login, request.url)
    return NextResponse.redirect(loginURL)
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
