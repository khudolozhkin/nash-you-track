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
import DeleteSpace from "./space-delete-button"
import SpacePinOperation from "./space-pin"
import LeaveSpace from "./space-leave-button"

type SpaceItem = {
  spaceId: string;
  userId: string;
  accessLevel: number;
  space: {
        name: string;
        description: string | null;
  }
}

export default function SpaceOperations({ spaceItem, dashboards }: { spaceItem: SpaceItem, dashboards: {id: string}[]}) {
  const [active, setActive] = useState<boolean>(false)
  
  return (
    <DropdownMenu open={active} onOpenChange={() => {setActive(!active)}}>
      <DropdownMenuTrigger>
        {(!active) ? <Icons.burger size={22} /> : <Icons.burgerActive size={22}/>}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <SpacePinOperation dashboards={dashboards} spaceItem={spaceItem}/>
        </DropdownMenuItem>
        
          {(spaceItem.accessLevel >= 7) ? <DropdownMenuItem><div className="flex"><Icons.settings size={20} className="mr-2"/><Link href={`/space/${spaceItem.spaceId}/settings`}>Настройки</Link></div></DropdownMenuItem> : (<></>)}
        <DropdownMenuItem asChild>
          {(spaceItem.accessLevel >= 7) ? <><DeleteSpace name="Удалить" setActive={setActive} userId={spaceItem.userId} spaceId={spaceItem.spaceId} /></> : <div className="flex"><LeaveSpace spaceId={spaceItem.spaceId} userId={spaceItem.userId}/></div>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}