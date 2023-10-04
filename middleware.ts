import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    
    if (req.nextUrl.pathname == '/') {
      if (isAuth) {
        return NextResponse.redirect(
          new URL(`/space`, req.url)
        );
      }
    } else {
      
      if (!isAuth) {
        let from = req.nextUrl.pathname;
        if (req.nextUrl.search) {
          from += req.nextUrl.search;
        }
  
        return NextResponse.redirect(
          new URL(`/`, req.url)
        );

      }
    }
  },
  {
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/', '/space', '/space/:path*', '/:path*']
}