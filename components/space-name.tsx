'use client'

import { useState, useEffect, useRef } from "react"
import Button from "./ui/button"
import { Icons } from "./ui/icons"
import { useRouter } from "next/navigation"

export default function SpaceName({name, description, spaceId} : {name: string, description: string | null, spaceId: string}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const nameInput = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  
  useEffect(() => {
    nameInput.current!.value = name
    if (description != null) {
      descriptionRef.current!.value = description
    }
  }, [name, description, nameInput])

  async function updateSpaceProp() {
    setIsLoading(true)

    let data
    if (descriptionRef.current!.value.length >= 3) {
      data = JSON.stringify({
        name: nameInput.current?.value,
        description: descriptionRef.current?.value
      })
    } else {
      data = JSON.stringify({
        name: nameInput.current?.value,
      })
    }

    const response = await fetch(`/api/spaces/${spaceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data
    })

    if (response.status != 200) {
      nameInput.current!.value = name
      if (description != null) {
        descriptionRef.current!.value = description
      }
      // catch error
    }

    if (response.status == 200) {
      let responseBody = await response.json()
      nameInput.current!.value = responseBody.name
      descriptionRef.current!.value = responseBody!.description
      router.refresh()
    }

    setIsLoading(false)
  }
  
  return (
    <>
      <div className="flex flex-col">
        <h1 className="font-bold text-xl">Свойства</h1>
        <label className="font-light text-lg pb-1 mt-3">Название</label>
        <input ref={nameInput} maxLength={32} minLength={3} name="name" className="bg-brand-background dark:bg-brand-background-dark w-full h-[30px] pl-2 rounded-md"/>
        <label className="font-light text-lg pb-1 mt-2">Описание</label>
        <textarea ref={descriptionRef} maxLength={152} name="description" className="bg-brand-background dark:bg-brand-background-dark w-full pl-2 pt-1 rounded-md !h-[70px] resize-none"/>
      </div>
      <Button onClick={updateSpaceProp} className="mt-4">{(isLoading) ? <Icons.loader className="animate-spin mr-2" size={20}/> : <></>} Сохранить</Button>
    </>
  )
}