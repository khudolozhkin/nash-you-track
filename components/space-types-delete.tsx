'use client'

import { useRouter } from "next/navigation"
import { Icons } from "./ui/icons"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"

export default function SpaceTypesDelete({ typeId, spaceId }: { typeId: string, spaceId: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  async function submit() {
    setIsLoading(true)

    const response = await fetch(`/api/spaces/${spaceId}/types/${typeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status != 200) {
      toast.custom((t) => (
        <ErrorToast t={t} header={`Что-то пошло не так`} p="Попробуйте позже"/>
      ))
    }

    if (response.status == 200) {
      router.refresh()
    }

    setIsLoading(false)
  }

  return (
    <>
      {(isLoading) ? <Icons.loader size={20} className="animate-spin cursor-pointer"/> : <Icons.close onClick={submit} size={20} className="cursor-pointer" />}
    </>
  )
}