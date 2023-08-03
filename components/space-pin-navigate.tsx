"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { NavigationMenuContent } from "./ui/navigation-menu"

export function PinNavigate({ userId, index, href, segment, title }: {userId: string | null | undefined, index: number, href: string, segment: string | null, title: string}) {
  const [spaces, setSpaces] = useState(JSON.parse(localStorage.getItem(`${userId}spaces`) || "[]"))

  useEffect(() => {
    localStorage.setItem(`${userId}spaces`, JSON.stringify(spaces))
  }, [spaces])

  const checkPinnedSpaces = () => {
    setSpaces(JSON.parse(localStorage.getItem(`${userId}spaces`) || "[]"))
  }

  return (
    <>
      {(spaces?.length != 0) ? <>
                <NavigationMenu.Root onValueChange={checkPinnedSpaces} className="text-secondary flex items-center text-lg font-medium transition-colors hover:text-primary dark:hover:text-primary-dark sm:text-sm">
                <NavigationMenu.List>
                  <NavigationMenu.Item>
                    <NavigationMenu.Trigger asChild>
                      <Link
                        href={href}
                        key={index}
                        className={`${href.startsWith(`/${segment}`) ? ('text-primary dark:text-primary-dark') : ('text-secondary')} flex items-center text-lg font-medium transition-colors hover:text-primary dark:hover:text-primary-dark sm:text-sm `}
                      >
                        {title}
                      </Link>
                    </NavigationMenu.Trigger>
                    <NavigationMenuContent>
                      dadwa
                    </NavigationMenuContent>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
              </NavigationMenu.Root>
                </> : <>
              <Link
                  href={href}
                  key={index}
                  className={`${href.startsWith(`/${segment}`) ? ('text-primary dark:text-primary-dark') : ('text-secondary')} flex items-center text-lg font-medium transition-colors hover:text-primary dark:hover:text-primary-dark sm:text-sm `}
                  onMouseEnter={checkPinnedSpaces}
                >
                  {title}
              </Link>
          </>
        }
    </>
  )
}