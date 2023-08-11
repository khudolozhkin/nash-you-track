'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "./ui/icons"

export default function UserKick({accessLevel, userId, spaceId}: {accessLevel: number, userId: string, spaceId: string}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  
  async function kickUser() {
    setIsLoading(true)
    
    const response = await fetch(`/api/spaces/${spaceId}/members/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status != 200) {
      // catch error
    }

    if (response.status == 200) {
      router.refresh()
    }

    setIsLoading(false)
  }

  return (
    <div onClick={kickUser} className="group cursor-pointer hover:bg-hover-item dark:hover:bg-hover-item-dark p-1 rounded transition-all">
      {(isLoading ? <Icons.loader className={`animate-spin duration-200 ease-in`} size={24}/> : <Icons.leave className="text-delete dark:text-delete-dark opacity-50 group-hover:opacity-100 transition-opacity" size={24}/>)}
    </div>
  )
}