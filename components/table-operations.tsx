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

export default function TableOperations({tableId} : {tableId: string}) {
  const [active, setActive] = useState<boolean>(false)
  
  return (
    <DropdownMenu open={active} onOpenChange={() => {setActive(!active)}}>
      <DropdownMenuTrigger className="focus:outline-none">
        {(!active) ? <Icons.burger size={18} /> : <Icons.burgerActive size={18}/>}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          <div className="flex items-center"><Icons.add size={18} className="mr-2"/>Столбец</div>
        </DropdownMenuItem>
        <TableDelete tableId={tableId}/>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}