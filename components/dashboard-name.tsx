'use client'

import { useState, useEffect, useRef } from "react"
import { AlternativeButton } from "./ui/button"
import { Icons } from "./ui/icons"
import { useRouter } from "next/navigation"

export default function DashboardName({name, id}: {name: string, id: string}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const nameInput = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    nameInput.current!.value = name
  }, [name, nameInput])

  async function updateName() {
    setIsLoading(true)

    const data = JSON.stringify({
      name: nameInput.current?.value,
    })

    const response = await fetch(`/api/dashboards/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data
    })

    if (response.status != 200) {
      // catch error
    }

    if (response.status == 200) {
      let responseBody = await response.json()
      nameInput.current!.value = responseBody.name
      router.refresh()
    }

    setIsLoading(false)
  }

  return (
    <>
      <div className="flex flex-col">
        <label className="font-bold text-xl pb-1">Название доски</label>
        <input ref={nameInput} maxLength={32} minLength={3} name="name" className="w-full h-[30px] pl-2 rounded-md"/>
      </div>
      <AlternativeButton onClick={updateName} className="mt-2">{(isLoading) ? <Icons.loader className="animate-spin mr-2" size={20}/> : <></>} Сохранить</AlternativeButton>
    </>
  )
}