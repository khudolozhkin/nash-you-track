import { Card } from "@prisma/client"
import * as HoverCard from '@radix-ui/react-hover-card'
import { Icons } from "./ui/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import useSWRImmutable, { mutate } from 'swr'
import Avatar from "./ui/avatar"
import { usePathname } from "next/navigation"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { CardType } from "@prisma/client"
import CardUser from "./card-user"

const fetcher = (url) => fetch(url).then(res => res.json())

export default function CardUsers({cardId, card, spaceId}: {cardId: string, spaceId: string, card: any}) {
  const { data, error, isValidating} = useSWRImmutable(`/api/spaces/${spaceId}/members`, fetcher)
  const pathname = usePathname()

  async function setUser(userId: string) {
    let data = JSON.stringify({
      userId: userId
    })

    const response = await fetch(`/api/cards/${cardId}/responsible`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data
    })

    if (response.status != 200) {
      toast.custom((t) => (
        <ErrorToast t={t} header={`Что-то пошло не так`} p={'Пользователь уже может быть назначен ответственным'}/>
      ))
    }

    if (response.status == 200) {
      mutate(`/api/cards/${cardId}`)
      mutate(`/api/spaces/${spaceId}/members`)
      mutate(`/api/dashboards/${pathname.split('/')[4]}`)
    }
  }

  if (data) {
    
    return (
      <div className="w-full mt-1 flex items-center flex-wrap">
          <div className="text-lg font-medium flex items-center mr-2">
            Ответственные:
          </div>
            {card.responsibleUsers.map((user) => <CardUser spaceId={spaceId} cardId={cardId} key={user.user.id} avatar={user.user.image} id={user.user.id} name={user.user.name}/>)}
          <div className="bg-border rounded-full h-[20px] cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <HoverCard.Root openDelay={0} closeDelay={0}>
                <HoverCard.Trigger asChild className="focus:outline-none opacity-50">
                  <div className="flex select-none items-center">
                    <div className="">
                      <Icons.add size={20}/>
                    </div>
                  </div>
                </HoverCard.Trigger>
                <HoverCard.Portal>
                  <HoverCard.Content sideOffset={5}
                    className="z-[1000] border border-border dark:border-border-dark bg-general-background dark:bg-brand-background-dark rounded-md data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade rounded-md bg-white p-2 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
                  >
                    <h1>Добавить пользователя</h1>
                    <HoverCard.Arrow className="fill-general-background dark:fill-brand-background-dark"/>
                  </HoverCard.Content>
                </HoverCard.Portal>
              </HoverCard.Root>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {data.map((item: {accessLevel: number, user: {image: string, id: string, name: string, email: string}}) => 
                <DropdownMenuItem onSelect={() => {setUser(item.user.id)}} key={item.user.id}>
                  <Avatar w={20} h={20} url={item.user.image}/>
                  <p className="ml-2">{item.user.name}</p>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
      </div>
    )
  }
}