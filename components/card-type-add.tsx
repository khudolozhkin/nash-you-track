'use client'

import { Icons } from "./ui/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { CardType } from "@prisma/client"
import { mutate } from "swr"

type Card = {
  name: string;
  content: JSON;
  Type: {
    id: string;
    name: string;
    color: string;
  } | null;
  column: {
      table: {
          dashboard: {
              spaceId: string;
          };
      };
  };
} | null

export default function CardTypeAdd({types, cardId, card}: {types: CardType[], cardId: string, card: Card}) {
  const [active, setActive] = useState<boolean>(false)
  const pathname = usePathname()
  const router = useRouter()
  
  async function setType(typeId) {
    
    let data = JSON.stringify({
      typeId: typeId
    })

    const response = await fetch(`/api/cards/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data
    })

    if (response.status != 200) {
      toast.custom((t) => (
        <ErrorToast t={t} header={`Что-то пошло не так`}/>
      ))
    }

    if (response.status == 200) {
      mutate(`/api/cards/${cardId}`)
      mutate(`/api/cards/${cardId}/types`)
      mutate(`/api/dashboards/${pathname.split('/')[4]}`)
    }
  }

  return (
    <>
      <DropdownMenu open={active} onOpenChange={() => {setActive(!active)}}>
        <DropdownMenuTrigger className="focus:outline-none md:h-full">
          {
            (card?.Type) ? 
            <div style={{backgroundColor: card?.Type?.color}} className={`ml-1 mt-1 items-center font-medium text-lg pl-2 text-[white] w-fit flex items-center px-1 md:h-full font-base rounded-lg max-h-[28px]`}>
              <p className="opacity-[85%] mr-1">{card?.Type?.name}</p>
            </div> :
            <Icons.add className="ml-2 mt-2" size={20}/>
          }
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          {(types.length == 0) ? <>
            <DropdownMenuItem onSelect={() => {router.push(`/space/${pathname.split('/')[2]}/settings`)}}>
              Нет типов карточек
            </DropdownMenuItem>
          </> 
          :
          <>
            {types.map((type) => <DropdownMenuItem onSelect={() => {setType(type.id)}} key={type.id}><div className="py-1 px-2 rounded-lg" style={{backgroundColor: type.color, color: 'white'}}><p className="opacity-[80%]">{type.name}</p></div></DropdownMenuItem>)}
            <DropdownMenuItem onSelect={() => {setType('')}}>Нет</DropdownMenuItem>
          </>}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}