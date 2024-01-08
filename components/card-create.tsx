'use client'

import { HoverButton, AlternativeButton } from "./ui/button"
import { Icons } from "./ui/icons"
import { useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { mutate } from "swr"
import { usePathname } from "next/navigation"

export default function CardCreate({columnId}: {columnId: string}) {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [inputNotEmpty, setInputNotEmpty] = useState<boolean>(false)
  const input = useRef<HTMLInputElement>(null)
  const pathname = usePathname()

  const onBlurHandler = () => {
    if (input.current?.value.length == 0) {
      setIsActive(false)
    }
  }

  const onChangeHandler = () => {
    setInputNotEmpty(input.current?.value.length != 0)
  }

  async function createCard() {
    let data = JSON.stringify({
      name: input.current!.value,
      columnId: columnId,
      spaceId: pathname.split('/')[2],
      dashboardId: pathname.split('/')[4],
    })

    const response = await fetch(`/api/cards/`, {
      method: "POST",
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
      toast.custom((t) => (
        <SuccessToast t={t} header={`Карточка создана`}/>
      ))
    }

    setIsActive(false)
  }

  if (isActive) {
    return (
      <div className="mt-2 mb-12 z-10 group/createCard opacity-100 transition-opacity duration-300">
        <div className='min-h-[50px] flex-col flex dark:bg-hover-item-dark bg-hover-item transition-opacity cursor-pointer'>
          <input placeholder="Название карточки" onChange={onChangeHandler} autoFocus onBlur={onBlurHandler} ref={input} maxLength={32} className="my-4 ml-2 w-[260px] h-[18px] outline-none bg-hover-item dark:bg-hover-item-dark"/>
          {inputNotEmpty ? <div className="flex-row-reverse gap-2 w-[calc(100%-15px)] flex mx-1 mb-2">
            <AlternativeButton onClick={createCard}>Создать</AlternativeButton>
            <HoverButton onClick={() => {setIsActive(false); setInputNotEmpty(false)}}>Отмена</HoverButton>
          </div> : <></>}
        </div>
      </div>
    )

  } else {
    return (
      <div className="mt-2 mb-12 group/createCard opacity-0 group-hover/column:opacity-100 transition-opacity">
        <div onClick={() => {setIsActive(true)}} className='min-h-[50px] flex items-center opacity-50 group-hover/createCard:opacity-80 dark:bg-hover-item-dark bg-hover-item transition-opacity cursor-pointer'>
          <div className="flex items-center"><Icons.add className="mx-1" size={18}/> Создать карточку</div>
        </div>
      </div>
    )
  }
}