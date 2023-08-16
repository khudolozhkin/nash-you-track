'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { Icons } from "./ui/icons"
import useSWRImmutable, { mutate } from 'swr'
import InviteItem from "./invite-item"
import * as HoverCard from '@radix-ui/react-hover-card'


const fetcher = (url) => fetch(url).then(res => res.json())

export default function InvitesDropdown() {
  const { data, error, isLoading } = useSWRImmutable('/api/invites', fetcher, { refreshInterval: 30000 })
  
  if (isLoading || data?.length == 0 || data == undefined) {
    return <>
    <HoverCard.Root openDelay={0} closeDelay={0}>
      <HoverCard.Trigger asChild className="focus:outline-none opacity-50">
        <div className="h-12 flex select-none items-center mr-2">
          <div className="flex transition-all justify-center items-center hover:bg-brand-background dark:hover:bg-brand-background-dark rounded-full w-[35px] h-[35px]">
            <Icons.mail size={20}/>
          </div>
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content sideOffset={5}
          className="bg-general-background dark:bg-brand-background-dark rounded-md data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade rounded-md bg-white p-2 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
        >
          <h1>У вас нет уведомлений</h1>
          <HoverCard.Arrow className="fill-general-background dark:fill-brand-background-dark"/>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  </>
  } 
  return (
  <>
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="h-12 flex select-none items-center pr-2">
          <div className="flex transition-all justify-center items-center hover:bg-brand-background dark:hover:bg-brand-background-dark rounded-full w-[35px] h-[35px]">
            <Icons.mail className="absolute" size={20}/>
            <div className="bg-delete dark:bg-delete-dark w-[15px] h-[15px] rounded-full relative left-[6px] top-[-8px] text-xs">
              <p className="text-primary-dark leading-[14px] truncate">{data.length}</p>
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {data.map((item, index) => <InviteItem inviteId={item.id} key={index} name={item.space.name}/>)}
      </DropdownMenuContent>
    </DropdownMenu>
  </>)
}