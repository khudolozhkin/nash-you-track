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

type AccountNavProps = {
  name: string | null | undefined,
  email: string | null | undefined,
  picture: string | null | undefined
}

export function UserAccountNav(user: AccountNavProps) {
  const { setTheme, theme } = useTheme()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="h-12 flex items-center">
          <Avatar url={user!.picture}/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
        <DropdownMenuItem onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            })
          }}>
          <Icons.logout className="mr-2" size={22}/>
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}