'use client'

import { AlternativeButton } from "./ui/button"
import { Icons } from "./ui/icons"
import { useState, useRef, useEffect } from "react"
import * as Dialog from '@radix-ui/react-dialog';
import { DialogTrigger, DialogOverlay, DialogContent } from "@/components/ui/dialog"
import Button from "./ui/button";
import { error } from "console";
import { useRouter, usePathname } from 'next/navigation'
import toast from 'react-hot-toast'
import { SuccessToast } from "./ui/toast";


export default function SpaceCreateButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const router = useRouter()
  const pathname = usePathname();

  useEffect(() => {
    const interval = setInterval(router.refresh, 30000)

    return () => clearInterval(interval);
  }, [])

  async function onSubmit() {
    setIsLoading(true)

    let data: string
    if (description.current!.value.length > 3) {
      data = JSON.stringify({
        name: name.current?.value,
        description: description.current?.value
      })
    } else {
      data = JSON.stringify({
        name: name.current?.value,
      })
    }

    const response = await fetch(`/api/spaces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data
    })

    if (response.status == 422) {
      let valid = await response.json()
      setError(valid[0]!.message)
    }

    if (response.status == 200) {
      let responseBody = await response.json()
      router.push(`${pathname}/${responseBody.newSpace.id}`)
      router.refresh()
      toast.custom((t) => (
        <SuccessToast t={t} header={`Создано новое пространство ${responseBody.newSpace.name}`}/>
      ))
    }

    setIsLoading(false)
  }

  return (
    <Dialog.Root>
      <DialogTrigger>
        <Button><Icons.add className="mr-2" size={20}/> Создать</Button>
      </DialogTrigger>
      <Dialog.Portal>
        <DialogOverlay>
          <DialogContent>
            <div>
              <h2 className="font-semibold text-lg md:text-xl text-primary dark:text-primary-dark">Создание пространства</h2>
              <div className="pt-2 flex flex-col">
                <label className="font-light pb-1">Название</label>
                <input ref={name} maxLength={32} minLength={3} name="name" className="h-[30px] pl-2 rounded-md w-[200px] md:w-[300px]"/>
              </div>
              <div className="pt-2 flex flex-col">
                <label className="font-light pb-1">Описание</label>
                <textarea ref={description} maxLength={92} name="description" className="w-[200px] md:w-[300px] pl-2 rounded-md !h-[100px] resize-none"/>
              </div>
                
              </div>
              {(error.length > 0) ? <p className="w-[300px] animate-slideLeftAndFade text-[red]">{error}</p> : <></>}
            <AlternativeButton onClick={onSubmit} className="mt-4">{(isLoading) ? <Icons.loader className="animate-spin mr-2" size={20}/> : <></>} Создать</AlternativeButton>
          </DialogContent>
        </DialogOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}