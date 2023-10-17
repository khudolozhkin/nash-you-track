'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { DialogTrigger, DialogOverlay, DialogContent } from "@/components/ui/dialog"
import { useState, useRef } from 'react'
import { Icons } from './ui/icons'
import { AlternativeButton } from './ui/button'
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { useRouter } from 'next/navigation'

export default function SpaceTypesCreate({ spaceId }: {spaceId: string}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const name = useRef<HTMLInputElement>(null)
  const color = useRef<HTMLInputElement>(null)
  const randomColor = Math.floor(Math.random()*16777215).toString(16)
  const router = useRouter()

  async function submit() {
    setIsLoading(true)

    let data = JSON.stringify({
      name: name.current?.value,
      color: color.current?.value
    })

    const response = await fetch(`/api/spaces/${spaceId}/types`, {
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
      setOpen(false)
      router.refresh()
      toast.custom((t) => (
        <SuccessToast t={t} header={`Новый тип карточки создан`}/>
      ))
    }

    setIsLoading(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={() => {setOpen(!open)}}>
      <DialogTrigger>
        <div className={`border cursor-pointer hover border-dashed opacity-[33%] transition-opacity hover:opacity-100 cursor-default font-medium text-lg bg-[#969696] px-2 mr-2 text-[white] w-fit flex items-center px-1 md:h-full font-base rounded-lg max-h-[28px]`}>
          <p className="flex items-center"><Icons.add className='mr-1' size={18}/>Добавить тип</p>
        </div>
      </DialogTrigger>
      <Dialog.Portal>
        <DialogOverlay>
          <DialogContent>
            <div>
              <h2 className="font-semibold text-lg md:text-xl text-primary dark:text-primary-dark">Новый тип карточки</h2>
              <div className="pt-2 flex flex-col">
                <label className="font-light pb-1">Название</label>
                <input ref={name} maxLength={32} minLength={3} name="name" className="h-[30px] pl-2 rounded-md w-[250px]"/>
              </div>
              <div className="pt-2 flex">
                <label className="font-light pb-1">Цвет:</label>
                <input ref={color} className='ml-1 w-[24px] focus:outline-none bg-transparent cursor-pointer border-none' type="color" defaultValue={`#${randomColor}`} />
              </div>
              <AlternativeButton onClick={submit} className="mt-4">{(isLoading) ? <Icons.loader className="animate-spin mr-2" size={20}/> : <></>}Создать</AlternativeButton>
            </div>
          </DialogContent>
        </DialogOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}