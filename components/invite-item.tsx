import { useState } from "react"
import { AlternativeButton, DeleteButton } from "./ui/button"
import { Icons } from "./ui/icons"
import { useRouter } from 'next/navigation'
import { mutate } from 'swr'

export default function InviteItem({name, inviteId}: {name: string, inviteId: string}) {
  const [isLoadingAccept, setIsLoadingAccept] = useState<boolean>(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)
  const router = useRouter()

  async function onSubmit(userResponse: boolean) {

    if (userResponse) {
      setIsLoadingAccept(true)
    } else {
      setIsLoadingDelete(true)
    }

    let data = JSON.stringify({
      response: userResponse
    })

    const response = await fetch(`/api/invites/${inviteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data
    })

    if (response.status != 200) {

    }

    if (response.status == 200) {
      if (userResponse) {
        let responseBody = await response.json()
        router.push(`/space/${responseBody.spaceId}`)
        router.refresh()
      }
      mutate('/api/invites')
    }

    if (userResponse) {
      setIsLoadingAccept(false)
    } else {
      setIsLoadingDelete(false)
    }
  }
  
  return (
    <>
      <div className="flex items-center justify-between w-[300px] px-4 py-2 dark:!border-border-dark">
        <div className="flex flex-col items-center">
          <h1>Вас пригласили в пространство {name}</h1>  
          <div className="mt-2 w-full flex justify-between">
            <AlternativeButton onClick={() => {onSubmit(true)}}>{(isLoadingAccept) ? <Icons.loader className="animate-spin mr-2" size={20}/> : <></>}Принять</AlternativeButton>
            <DeleteButton onClick={() => {onSubmit(false)}}>{(isLoadingDelete) ? <Icons.loader className="animate-spin mr-2" size={20}/> : <></>}Отклонить</DeleteButton>
          </div>
        </div>
      </div>
    </>
  )
}