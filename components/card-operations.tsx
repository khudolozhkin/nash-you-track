'use client'

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { Icons } from "./ui/icons"
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu"
import CardDelete from "./card-delete"

export default function CardOperations({cardId}: {cardId: string}) {
  const [active, setActive] = useState<boolean>(false)
  
  return (
    <DropdownMenu open={active} onOpenChange={() => {setActive(!active)}}>
      <DropdownMenuTrigger className="focus:outline-none">
        <Icons.options size={22} />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
          <DropdownMenuContent align="center">
            <CardDelete cardId={cardId}/>
          </DropdownMenuContent>
        </DropdownMenuPortal>
    </DropdownMenu>
  )
}