"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { NavItem } from "@/types"
import { marketingConfig } from "@/config/marketing"
import { SiteConfig } from "@/types"
import { Icons } from "@/components/ui/icons"
import { useState, useEffect } from "react"
import { siteConfig } from "@/config/site"
import { PinNavigate } from "./space-pin-navigate"

interface MainNavProps {
  items?: NavItem[],
  userId: string | null | undefined,
  children?: React.ReactNode
}

export function MainNav({items, userId, children}: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href='/' className="hidden items-center space-x-2 md:flex">
        <Icons.logo color="#632dc1"/>
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {(items?.length != 0) ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            // eslint-disable-next-line react/jsx-key
            <div key={index}>
              {(item.href == '/space') ? <div>
                <PinNavigate userId={userId} index={index} key={index} href={item.href} segment={segment} title={item.title}/>
              </div>
              : 
              <div>
                <Link
                  key={index}
                  href={item.disabled ? '#' : item.href}
                  className={`${item.href.startsWith(`/${segment}`) ? ('text-primary dark:text-primary-dark') : ('text-secondary')} flex items-center text-lg font-medium transition-colors hover:text-primary dark:hover:text-primary-dark sm:text-sm `}
                >
                  {item.title}
                </Link>
              </div>}
            </div>
          ))}
        </nav>
      ) : null}
    </div>
  )
}