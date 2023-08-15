'use client'

import * as ContextMenu from '@radix-ui/react-context-menu'
import { useState } from 'react'
import { Icons } from './icons'
import TableCreate from '../table-create'
import * as Dialog from '@radix-ui/react-dialog';
import { DialogTrigger, DialogOverlay, DialogContent } from "@/components/ui/dialog"

export default function DashboardRightClick({children, dashboardId} : {children: React.ReactNode, dashboardId: string}) {
  const [isDashboard, setIsDashboard] = useState<boolean>(false)
  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)

  function defineContext(e) {
    setIsDashboard(e.target.id == 'dashboard')
    setX(e.nativeEvent.offsetX)
    setY(e.nativeEvent.offsetY)
  }

  return (
   <>
    <ContextMenu.Root modal={false}>
      <ContextMenu.Trigger onAuxClick={(e) => {defineContext(e)}} id='dashboard' className="w-full h-full box-border overflow-auto">
        <div className=''>
          {children}
        </div>
      </ContextMenu.Trigger>

      {isDashboard ? <>
        <ContextMenu.Portal>
          <ContextMenu.Content className='border border-border dark:border-border-dark max-w-[300px] bg-general-background dark:bg-brand-background-dark rounded-md p-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideUpAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideUpAndFade'>
            <ContextMenu.Item className='cursor-pointer relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-hover-item dark:hover:bg-hover-item-dark data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
              <div onClick={() => {setOpen(!open)}} className="flex">
                <Icons.table className='mr-2' size={20}/> Создать таблицу
              </div>
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </> : <></>}
    </ContextMenu.Root>
    <Dialog.Root onOpenChange={() => setOpen(!open)} open={open}>
        
    <Dialog.Portal>
      <DialogOverlay>
        <DialogContent>
          <TableCreate setOpen={setOpen} x={x} y={y} dashboardId={dashboardId}/>
        </DialogContent>
      </DialogOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  </>
  )
}