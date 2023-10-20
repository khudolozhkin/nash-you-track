'use client'

import { useState, useEffect, useRef, Key } from "react"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { mutate } from "swr"
import { Prisma } from "@prisma/client"
import { usePathname, useRouter } from "next/navigation"

type Card = {
  name: string;
  content: Prisma.JsonValue;
  column: {
        table: {
            dashboard: {
                spaceId: string;
            };
        };
    } | null
}

export default function CardName({card, cardId}: {card: Card, cardId: string}) {
  const [value, setValue] = useState<string>(card.name)
  const input = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  
  useEffect(() => {
    input.current!.value = value
  }, [])

  const onChange = () => {
    setValue(input.current!.value)
  }

  const onBlur = () => {
    input.current!.value = card.name
    input.current!.size = card.name.length
  }

  async function handleKeyDown(event) {
    if (event.key === 'Escape') {
      input.current?.blur()
    }
    if (event.key === 'Enter') {
      let data = JSON.stringify({
        name: value
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
          <ErrorToast t={t} header={`Что-то пошло не так`} p="Название должно быть больше 2 символов"/>
        ))
      }
  
      if (response.status == 200) {
        let responseBody = await response.json()
        mutate(`/api/dashboards/${pathname.split('/')[4]}`)
        router.refresh()
        toast.custom((t) => (
          <SuccessToast t={t} header={`Название изменено`}/>
        ))
        input.current!.value = responseBody.name
        card.name = responseBody.name
        setValue(responseBody.name)
      }
    }
  };
  
  return (
    <>
      <input placeholder="Название карточки..." ref={input} onBlur={onBlur} onKeyDown={(e) => {handleKeyDown(e)}} onChange={onChange} maxLength={32} className="truncate mb-[2px] font-bold text-3xl h-[42px] outline-none bg-general-background dark:bg-brand-background-dark" size={value.length}/>
    </>
  )
}