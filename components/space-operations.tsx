'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { Icons } from "./ui/icons"
import { useState } from "react"

export default function SpaceOperations() {
  const [active, setActive] = useState<boolean>(false)
  
  return (
    <DropdownMenu onOpenChange={() => {setActive(!active)}}>
      <DropdownMenuTrigger>
        {(!active) ? <Icons.burger size={22} /> : <Icons.burgerActive size={22}/>}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={(event) => {
            event.preventDefault()
          }}>
            <Icons.light />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}