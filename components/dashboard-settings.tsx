'use client'

import { useState } from "react"
import { Icons } from "./ui/icons"
import * as Dialog from '@radix-ui/react-dialog'
import { DialogClose, DialogOverlay, DialogContent, DialogTrigger } from "./ui/dialog"
import * as Tabs from '@radix-ui/react-tabs'
import DashboardName from "./dashboard-name"
import DashboardDelete from "./dashboard-delete"

export default function DashboardSettings({dashboard, accessLevel}: {dashboard: {createdAt: Date, name: string, id: string, spaceId: string}, accessLevel: number}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={() => {setOpen(!open)}}>
        <DialogTrigger>
          <div className="group/settings">
            <Icons.settings className="transition-opacity opacity-0 group-hover/item:opacity-50 group-hover/settings:opacity-100" size={18}/> 
          </div>
        </DialogTrigger>
        <Dialog.Portal>
        <DialogOverlay>
          <DialogContent>
              <Tabs.Root className="flex flex-col sm:flex-row gap-2" defaultValue="properties">
                <Tabs.List className="border-b sm:border-b-0 sm:border-r border-border dark:border-border-dark sm:pr-4 gap-1 overflow-auto flex flex-row w-[100%] sm:flex-col min-w-[50px] max-w-fit">
                  <Tabs.Trigger className="cursor-pointer relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-hover-item dark:hover:bg-hover-item-dark opacity-50 data-[state=active]:opacity-100" value="properties">
                    <Icons.properties className="mr-2" size={18}/>
                    Свойства
                  </Tabs.Trigger>
                  {(accessLevel >= 7) ? <>
                    <Tabs.Trigger className="text-delete dark:text-delete-dark cursor-pointer relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-hover-item dark:hover:bg-hover-item-dark opacity-50 data-[state=active]:opacity-100" value="delete">
                      <Icons.delete className="mr-2" size={18}/>
                      Удалить
                    </Tabs.Trigger>
                  </> : 
                  <></>}
                </Tabs.List>
                <Tabs.Content className="focus:outline-none data-[state=active]:animate-slideUpAndFade" value="properties">
                  <div className="pl-4 w-[50vw] max-w-[400px] h-[50vh]">
                    <DashboardName name={dashboard.name} id={dashboard.id}/>
                  </div>
                </Tabs.Content >
                {(accessLevel >= 7) ? <>
                  <Tabs.Content className="focus:outline-none data-[state=active]:animate-slideUpAndFade" value="delete">
                    <div className="pl-4 w-[50vw] max-w-[400px] h-[50vh]">
                      <DashboardDelete open={open} setOpen={setOpen} id={dashboard.id}/>
                    </div>
                  </Tabs.Content>
                </> 
                  :
                <></>}
              </Tabs.Root>
          </DialogContent>
        </DialogOverlay>
        </Dialog.Portal>
    </Dialog.Root>
  )
}