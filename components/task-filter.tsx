'use client'

import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown"
import { useRouter } from 'next/navigation'

type Spaces = {  
  space: {
      name: string;
      description: string | null;
      dashboards: { id: string; }[];
    };
  userId: string;
  spaceId: string;
  accessLevel: number;
}[]

export default function TaskFilter({spaceParams, spaces}: {spaceParams: string | undefined, spaces: Spaces}) {
  const [active, setActive] = useState<boolean>(false)
  const [spaceFiltered, setSpaceFiltered] = useState<boolean>(spaceParams != undefined)
  const router = useRouter()

  
  
  return (
    <div className="flex pt-8 container max-w-5xl">
      <p className="text-lg font-medium">Пространства:</p>
      <DropdownMenu open={active} onOpenChange={() => {setActive(!active)}}>
        <DropdownMenuTrigger className="focus:outline-none md:h-full">
          <div className="ml-2 cursor-pointer bg-brand-background dark:bg-brand-background-dark text-lg relative font-medium flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-hover-item dark:hover:bg-hover-item-dark data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            {
              spaceFiltered ? spaces.find(space => space.spaceId == spaceParams)?.space.name : "Все"
            }
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
            <DropdownMenuItem onSelect={() => {router.replace('/tasks'); setSpaceFiltered(false)}}>
              Все
            </DropdownMenuItem>
            {spaces.map((space) => <>
              <DropdownMenuItem onSelect={() => {router.replace(`/tasks?space=${space.spaceId}`); setSpaceFiltered(true)}}>
                {space.space.name}
              </DropdownMenuItem>
            </>)}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}