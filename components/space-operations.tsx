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
import Link from "next/link"
import DeleteSpace from "./delete-space-button"
import SpacePinOperation from "./space-pin"

type SpaceItem = {
  spaceItem: {
    spaceId: string;
    userId: string;
    accessLevel: number;
    space: {
        name: string;
        description: string | null;
    }
  }
}

export default function SpaceOperations({ spaceItem }: SpaceItem) {
  const [active, setActive] = useState<boolean>(false)
  
  return (
    <DropdownMenu open={active} onOpenChange={() => {setActive(!active)}}>
      <DropdownMenuTrigger>
        {(!active) ? <Icons.burger size={22} /> : <Icons.burgerActive size={22}/>}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <SpacePinOperation spaceItem={spaceItem}/>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {(spaceItem.accessLevel > 1) ? <div className="flex"><Icons.settings size={20} className="mr-2"/><Link href={`/space/${spaceItem.spaceId}/settings`}>Настройки</Link></div> : (<></>)}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          {(spaceItem.accessLevel == 7) ? <><DeleteSpace spaceId={spaceItem.spaceId} /></> : <div className="flex"><Icons.leave size={20} className="mr-2"/>Покинуть</div>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}