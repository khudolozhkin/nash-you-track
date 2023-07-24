type Routes = string;
import { LucideIcon } from "lucide-react"
export type Icon = LucideIcon

export declare type RouteConfig = {
  routes: Routes[];
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    github: string
    tg: string
  }
}