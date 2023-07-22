"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { NavItem } from "@/types"
import { marketingConfig } from "@/config/marketing"
import { SiteConfig } from "@/types"
import { Icons } from "@/components/ui/icons"
import { useState } from "react"
import { siteConfig } from "@/config/site"

interface MainNavProps {
  items?: NavItem[]
  children?: React.ReactNode
}

export function MainNav({items, children}: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const showMobileNav = useState<boolean>(false)
  
  return(
    <div className="flex gap-6 md:gap-10">
      <Link href='/' className="hidden items-center space-x-2 md:flex">
        <Icons.logo color="#632dc1"/>
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={`${item.href.startsWith(`/${segment}`) ? ('text-primary dark:text-primary-dark') : ('text-secondary')} flex items-center text-lg font-medium transition-colors hover:text-primary dark:hover:text-primary-dark sm:text-sm `}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  )
}