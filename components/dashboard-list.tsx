'use client'

import { useState, useEffect } from "react"
import { Dashboard } from "@prisma/client"
import { Icons } from "./ui/icons"
import { DashboardCreate } from "./dashboard-create"
import { useRouter, usePathname } from "next/navigation"
import DashboardSettings from "./dashboard-settings"

export default function DashboardList({dashboards, accessLevel, spaceId}: {dashboards: Dashboard[] | undefined, accessLevel: number, spaceId: string}) {
  const [isOpen, setIsOpen] = useState<boolean>(!(dashboards!.length > 5))
  const router = useRouter()
  const pathname = usePathname()
  const height = (dashboards!.length * 28) + 40
  
  useEffect(() => {
    const interval = setInterval(router.refresh, 10000)
    return () => clearInterval(interval);
  }, [])
  
  return (
    <>
      <li className="list-none mt-4">
        <a onClick={() => {setIsOpen(!isOpen)}} className="rounded hover:bg-hover-item dark:hover:bg-hover-item-dark transition-colors flex w-full relative cursor-pointer items-center justify-between rounded-md px-1 py-1 text-lg md:text-xl font-medium">
          Доски 
          <Icons.arrow size={20} className={`${isOpen ? ('rotate-0') : ('rotate-[-90deg]')} duration-200 ease-in`}/>
        </a>
        <div className={`${isOpen ? ('opacity-100') : ('opacity-0')} duration-200 ease-in overflow-hidden flex flex-col`} style={{height: isOpen ? `${height}px` : `0px`}}>
          <div className="relative">
            <ul className="text-secondary transition-colors md:text-lg cursor-pointer font-medium px-0.5 dark:border-dark/50 pl-3 ml-2">
              {dashboards?.map((item: {id: string; name: string; createdAt: Date; spaceId: string;}, index) => (
                <li key={index} onClick={() => {router.push(`/space/${spaceId}/dashboard/${item.id}`)}} className={`${(pathname.slice(0, 68) == `/space/${spaceId}/dashboard/${item.id}`) ? ("text-primary dark:text-primary-dark") : ("")} whitespace-nowrap truncate transition-opacity transition-colors items-center group/item flex place-content-between hover:text-primary transition-colors dark:hover:text-primary-dark`}>
                  <p className="whitespace-nowrap truncate">
                    {item.name}
                  </p>
                  {(accessLevel >= 4) ? <DashboardSettings accessLevel={accessLevel} dashboard={item} /> : <></> }
                </li>
              ))}
            </ul>
            {(accessLevel >= 4) ? <DashboardCreate spaceId={spaceId}/> : <div></div>}
          </div>
        </div>
      </li>
    </>
  )
}