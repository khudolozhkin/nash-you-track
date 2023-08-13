'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "./ui/icons"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"

export default function InviteDelete({accessLevel, userId, inviteId}: {accessLevel: number, userId: string, inviteId: string}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  
  async function kickUser() {
    setIsLoading(true)
    
    const response = await fetch(`/api/invites/${inviteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status != 200) {
      toast.custom((t) => (
        <ErrorToast t={t} header={`Что-то пошло не так`}/>
      ))
    }

    if (response.status == 200) {
      router.refresh()
      toast.custom((t) => (
        <SuccessToast t={t} header={`Приглашение удалено`}/>
      ))
    }

    setIsLoading(false)
  }

  return (
    <div onClick={kickUser} className="group cursor-pointer hover:bg-hover-item dark:hover:bg-hover-item-dark p-1 rounded transition-all">
      {(isLoading ? <Icons.loader className={`animate-spin duration-200 ease-in text-delete dark:text-delete-dark`} size={24}/> : <Icons.delete className="text-delete dark:text-delete-dark opacity-50 group-hover:opacity-100 transition-opacity" size={24}/>)}
    </div>
  )
}