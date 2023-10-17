'use client'

import { Dashboard } from "@prisma/client"
import DashboardList from "./dashboard-list"
import SpaceSetting from "./space-settings"
import { Icons } from "./ui/icons"
import { useState } from "react"

export default function SpaceBurgerMenu({name, accessLevel, spaceId, dashboards, children}: {children: React.ReactNode, name: string | undefined, accessLevel: number, spaceId: string, dashboards: Dashboard[] | undefined}) {
  const [active, setActive] = useState(true);
  
  return (
    <>
      <div className="static flex h-[calc(100vh-57px)]">
          <div style={{minWidth: (active) ? '250px' : '25px'}} className="h-full overflow-y-auto overscroll-y-auto no-scrollbar overflow-hidden relative max-w-[300px] flex border-r border-border dark:border-border-dark px-2 py-2 flex-col">
            {
              (active) ? <>
                <div className="mx-4 flex justify-center items-center gap-2">
                  <h1 className="whitespace-nowrap truncate font-bold text-xl md:text-2xl text-primary dark:text-primary-dark">{name}</h1>
                  <Icons.closeBurger onClick={() => {setActive(false)}} className="cursor-pointer min-w-[24px] block xl:hidden" size={24}/>
                </div>
                <DashboardList accessLevel={accessLevel} spaceId={spaceId} dashboards={dashboards} />
                {(accessLevel >= 7) ? <SpaceSetting spaceId={spaceId}/> : <></>}
              </> : <>
                <div className="flex justify-center items-center gap-2">
                  <Icons.openBurger onClick={() => {setActive(true)}} className="cursor-pointer min-w-[24px] block xl:hidden" size={24}/>
                </div>
              </>
            }
          </div>
          {children}
        </div>
    </>
  )
}