'use client'

import { Dashboard } from "@prisma/client"
import DashboardList from "./dashboard-list"
import SpaceSetting from "./space-settings"
import { Icons } from "./ui/icons"
import { useState } from "react"
import SpaceDeadlines from "./space-deadlines"

export default function SpaceBurgerMenu({name, accessLevel, spaceId, dashboards, children}: {children: React.ReactNode, name: string | undefined, accessLevel: number, spaceId: string, dashboards: Dashboard[] | undefined}) {
  const [active, setActive] = useState(false);
  
  return (
    <>
      <div className="static flex h-[calc(100vh-57px)] flex-col sm:flex-row">
          <div className="hidden sm:block h-full overflow-y-auto overscroll-y-auto no-scrollbar overflow-hidden relative min-w-[250px] max-w-[300px] flex border-r border-border dark:border-border-dark px-2 py-2 flex-col">
            <div className="mx-4 flex justify-center items-center gap-2">
              <h1 className="whitespace-nowrap truncate font-bold text-xl md:text-2xl text-primary dark:text-primary-dark">{name}</h1>
            </div>
            <DashboardList accessLevel={accessLevel} spaceId={spaceId} dashboards={dashboards} />
            <SpaceDeadlines spaceId={spaceId} />
            {(accessLevel >= 7) ? <SpaceSetting spaceId={spaceId}/> : <></>}
          </div>
          <div className="block sm:hidden flex flex-row-reverse border-b border-border dark:border-border-dark"><Icons.burger onClick={() => {setActive(true)}} className="mr-[32px] my-2 cursor-pointer"/></div>
          {active ? <>
            <div onClick={() => {setActive(false)}} className="bg-brand-background container dark:bg-brand-background-dark h-full w-full absolute top-0 left-0 z-[11111]">
              <div className="mb-4 mt-8 flex justify-center items-center gap-2">
                <h1 className="whitespace-nowrap truncate font-bold text-xl md:text-2xl text-primary dark:text-primary-dark">{name}</h1>
                <Icons.close onClick={() => {setActive(false)}} className="cursor-pointer"/>
              </div>
              <DashboardList accessLevel={accessLevel} spaceId={spaceId} dashboards={dashboards} />
              <SpaceDeadlines spaceId={spaceId} />
              {(accessLevel >= 7) ? <SpaceSetting spaceId={spaceId}/> : <></>}
            </div>
          </> : <></>}
          {children}
        </div>
    </>
  )
}