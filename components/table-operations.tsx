'use client'

import { Icons } from "./ui/icons"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import TableDelete from "./table-delete"
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu"
import ColumnCreate from "./column-create"

export default function TableOperations({tableId, swrData} : {tableId: string, swrData: any}) {
  const [active, setActive] = useState<boolean>(false)
  
  return (
    <div className="ml-2 transition-opacity duration-500 flex items-center sticky right-0">
      <DropdownMenu modal={false} open={active} onOpenChange={() => {setActive(!active)}}>
        <DropdownMenuTrigger className={`${active ? '!opacity-100' : ''} group-hover/table:opacity-100 opacity-0 transition-opacity focus:outline-none`}>
          {(!active) ? <Icons.burger size={18} /> : <Icons.burgerActive size={18}/>}
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent className={'!opacity-100'} align="end">
            <DropdownMenuItem>
              <ColumnCreate swrData={swrData} tableId={tableId}/>
            </DropdownMenuItem>
            <TableDelete tableId={tableId}/>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  )
}