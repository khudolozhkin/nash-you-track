'use client'

import * as HoverCard from '@radix-ui/react-hover-card'
import Avatar from "./ui/avatar"
import { Icons } from "./ui/icons"
import { Card } from '@prisma/client'
import { usePathname } from 'next/navigation'
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { mutate } from 'swr'

export default function CardUser({avatar, name, id, cardId,spaceId}: {spaceId: string, avatar: string, name: string, id: string, cardId: string}) {
  const pathname = usePathname()

  async function deleteUser() {
    const response = await fetch(`/api/cards/${cardId}/responsible/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status != 200) {
      toast.custom((t) => (
        <ErrorToast t={t} header="Что-то пошло не так"/>
      ))
    }

    if (response.status == 200) {
      mutate(`/api/cards/${cardId}`)
      mutate(`/api/spaces/${spaceId}/members`)
      mutate(`/api/dashboards/${pathname.split('/')[4]}`)
    }
  }
  
  return (
    <>
      <HoverCard.Root openDelay={0} closeDelay={0}>
          <HoverCard.Trigger asChild className="focus:outline-none">
              <div onClick={deleteUser} className="group/cardUserAvatar flex select-none items-center mr-[-10px] cursor-pointer">
                <div className='group-hover/cardUserAvatar:opacity-[35%] opacity-100 transition-opacity'><Avatar w={20} h={20} url={avatar}/></div>
                <Icons.close className='group-hover/cardUserAvatar:opacity-[100%] opacity-0 relative left-[-18px] transition-opacity' size={15}/>
              </div>
          </HoverCard.Trigger>
              <HoverCard.Portal>
                <HoverCard.Content sideOffset={5}
                  className="z-[1000] border border-border dark:border-border-dark bg-general-background dark:bg-brand-background-dark rounded-md data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade rounded-md bg-white p-2 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
                >
                  <h1>{name}</h1>
                <HoverCard.Arrow className="fill-general-background dark:fill-brand-background-dark"/>
              </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
    </>
  )
}