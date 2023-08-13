'use client'

import { userRoles } from "@/config/user-roles"
import { Icons } from "./ui/icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"


export default function UserRole({accessLevel, changeable, userId, spaceId}: {accessLevel: number, changeable: boolean, userId: string, spaceId: string}) {
  const role = userRoles.filter((item) => item.accessToken == accessLevel)[0]
  const [active, setActive] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  async function changeRole(accessLevel: number) {
    setIsLoading(true)
    
    let data = JSON.stringify({
      accessLevel: accessLevel
    })
    
    const response = await fetch(`/api/spaces/${spaceId}/members/${userId}`, {
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
      router.refresh()
    }

    setIsLoading(false)
  }

  if (changeable) {
    return (
      <>
      <DropdownMenu open={active} onOpenChange={() => {setActive(!active)}}>
      <DropdownMenuTrigger className="focus:outline-none md:ml-4 md:h-full">
        <div
          className={`flex text-sm items-center px-1 md:h-full font-base rounded-lg max-h-[28px]`}
          style={{background: role.color, color: role.textColor}}
        >
          {(isLoading ? <Icons.loader className={`animate-spin duration-200 ease-in`} size={18}/> : <></>)}{role.name} <Icons.arrow size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {((accessLevel == 1) ? <></> : <>
          <DropdownMenuItem asChild>
            <div onClick={() => {changeRole(1)}} className={`cursor-pointer relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-hover-item dark:hover:bg-[${userRoles[0].color}] data-[disabled]:pointer-events-none data-[disabled]:opacity-50`}>
              Участник
            </div>
          </DropdownMenuItem>
        </>)}
        {((accessLevel == 4) ? <></> : <>
          <DropdownMenuItem asChild>
            <div onClick={() => {changeRole(4)}} className="cursor-pointer relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-hover-item dark:hover:bg-hover-item-dark data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              Модератор
            </div>
          </DropdownMenuItem>
        </>)}
      </DropdownMenuContent>
    </DropdownMenu>
      </>
    )
  }
  
  return (
    <>
      <div
        className={`flex text-sm items-center font-base md:ml-4 rounded-lg px-1 max-h-[28px]`}
        style={{background: role.color, color: role.textColor}}
      >
        {role.name}
      </div>
    </>
  )
}