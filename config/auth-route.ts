import { RouteConfig } from '@/types'

export const routeConfig : RouteConfig = {
  routes: [
    "/dashboard/:path*",
    "/",
    "/login",
    "/register"
  ]
}