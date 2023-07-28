'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"

import { signOut } from "next-auth/react"
import Avatar from "@/components/ui/avatar"
import { Icons } from "@/components/ui/icons"
import { useTheme } from "next-themes"
import Link from "next/link"
import { workConfig } from "@/config/work"
import { useState } from "react"

type AccountNavProps = {
  name: string | null | undefined,
  email: string | null | undefined,
  picture: string | null | undefined
}

export function UserAccountNav(user: AccountNavProps) {
  const { setTheme, theme } = useTheme();
  const [ logout, setLogout ] = useState<boolean>(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="h-12 flex items-center">
          <Avatar url={user!.picture} w={35} h={35}/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="px-2 pt-1.5 pb-4 flex">
          <Avatar url={user!.picture} w={50} h={50}/>
          <div className="flex flex-col px-2 max-w-[calc(100%-50px)]">
            <div className="font-bold whitespace-nowrap truncate">{user.name}</div>
            <div className="font-normal whitespace-nowrap truncate">{user.email}</div>
            <Link className="pt-1 text-call-to-action hover:text-themed-color transition-colors" href={'/setting'}>Настройки профиля</Link>
          </div>
        </div>
        
        <div className="flex justify-around">
          <DropdownMenuItem onSelect={(event) => {
            event.preventDefault()
            setTheme("light")
          }}>
            <Icons.light className={(theme == 'light') ? "" : "opacity-50"} size={22}/>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(event) => {
            event.preventDefault()
            setTheme("dark")
          }}>
            <Icons.dark className={(theme == 'dark') ? "" : "opacity-50"} size={22}/>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(event) => {
            event.preventDefault()
            setTheme("system")
          }}>
            <Icons.system className={(theme == 'system') ? "" : "opacity-50"} size={22}/>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild={true}>
          <Link href={workConfig.mainNav[0].href}><Icons.task className="mr-2" size={22}/> {workConfig.mainNav[0].title}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild={true}>
          <Link href={workConfig.mainNav[1].href}><Icons.space className="mr-2" size={22}/> {workConfig.mainNav[1].title}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={(event) => {
            event.preventDefault()
            setLogout(true)
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            })
          }}>
          {(logout) ? <Icons.loader className="animate-spin mr-2" size={22}/> : <Icons.logout className="mr-2" size={22}/>}
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}