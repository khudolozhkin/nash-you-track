"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { NavigationMenuContent } from "./ui/navigation-menu"
import { useRouter } from "next/navigation"
import { Icons } from "./ui/icons"

export function PinNavigate({ userId, index, href, segment, title }: {userId: string | null | undefined, index: number, href: string, segment: string | null, title: string}) {
  const [spaces, setSpaces] = useState([])

  useEffect(() => {
    setSpaces(JSON.parse(localStorage.getItem(`${userId}spaces`) || "[]"))
  }, [userId])

  const checkPinnedSpaces = () => {
    setSpaces(JSON.parse(localStorage.getItem(`${userId}spaces`) || "[]"))
  }
  
  const removeSpace = (id: string) => {
    const newSpaces = spaces.filter((item: {id: string}) => item.id != id)
    setSpaces(newSpaces)
    localStorage.setItem(`${userId}spaces`, JSON.stringify(newSpaces))
  }

  const router = useRouter()
  
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
                      {spaces?.map((item: {name: string, id: string, description: string, dashboards: {id: string}[]}, index) => (
                        <div className="items-center cursor-pointer w-[250px] h-[50px] hover:bg-hover-item dark:hover:bg-hover-item-dark rounded-md flex justify-between px-1 py-1 dark:!border-border-dark" key={index}>
                          <div onClick={() => {router.push(`/space/${item!.id}${(item.dashboards.length > 0 ) ? `/dashboard/${item.dashboards[0].id}` : ""}`)}} className="flex group w-[200px] flex-col">
                            <h1 className="leading-snug whitespace-nowrap truncate font-semibold text-lg md:text-xl text-primary decoration-1 dark:text-primary-dark group-hover:underline underline-offset-4 transition">
                              {item!.name}
                            </h1>
                            <p className="leading-none truncate font-light text-secondary dark:text-secondary-dark">
                              {item!.description}
                            </p>
                          </div>
                          <div className="will-change-auto pr-2 opacity-[50%] hover:opacity-[100%]" onClick={() => {removeSpace(item.id)}}>
                            <Icons.pinOff size={20}/>
                          </div>
                        </div>
                      ))}
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