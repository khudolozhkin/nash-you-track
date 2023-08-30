'use client'

import { AlternativeButton } from "./ui/button"
import { Icons } from "./ui/icons"
import { useState, useRef } from "react"
import * as Dialog from '@radix-ui/react-dialog'
import { DialogTrigger, DialogOverlay, DialogContent } from "@/components/ui/dialog"
import Button from "./ui/button"
import { useRouter, usePathname } from 'next/navigation'
import { userRoles } from "@/config/user-roles"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"


export default function SpaceCreateInviteButton({spaceId}: {spaceId: string}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [accessLevel, setAccessLevel] = useState<number>(1)
  const email = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  async function onSubmit() {
    setIsLoading(true)

    let data = JSON.stringify({
      spaceId: spaceId,
      accessLevel: accessLevel,
      userEmail: email.current!.value
    })

    const response = await fetch(`/api/invites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data
    })

    if (response.status != 200) {
      toast.custom((t) => (
        <ErrorToast t={t} header={`Что-то пошло не так`} p="Такой пользователь не найден"/>
      ))
    }

    if (response.status == 200) {
      let responseBody = await response.json()
      console.log(responseBody)
      router.refresh()
      setOpen(false)
      toast.custom((t) => (
        <SuccessToast t={t} header={`Приглашение отправлено`}/>
      ))
    }

    setIsLoading(false)
  }

  return (
    <Dialog.Root open={open} onOpenChange={() => {setOpen(!open)}}>
      <DialogTrigger>
        <Button><Icons.add className="mr-2" size={20}/> Пригласить</Button>
      </DialogTrigger>
      <Dialog.Portal>
        <DialogOverlay>
          <DialogContent>
            <div>
              <h2 className="font-semibold text-lg md:text-xl text-primary dark:text-primary-dark">Приглашение</h2>
              <div className="pt-2 flex flex-col">
                <label className="font-light pb-1">Почта пользователя</label>
                <input ref={email} maxLength={32} minLength={3} name="name" className="h-[30px] pl-2 rounded-md w-[300px]"/>
              </div>
                <div className="flex flex-wrap mt-2 w-[300px]">
                  {userRoles.map((item, index) => (<>
                    {item.accessToken > 4 ? <></> : <>
                      <div
                      onClick={() => {setAccessLevel(item.accessToken)}}
                        className={`${accessLevel == item.accessToken ? "opacity-100" : "opacity-25"} select-none transition-all cursor-pointer flex text-sm mt-1 items-center mx-1 w-fit font-base rounded-lg px-1 max-h-[30px]`}
                        style={{background: item.color, color: item.textColor}}
                      >
                        {item.name}
                      </div>
                    </>}
                  </>))}
                </div>
              </div>
            <AlternativeButton onClick={onSubmit} className="mt-4">{(isLoading) ? <Icons.loader className="animate-spin mr-2" size={20}/> : <></>} Отправить</AlternativeButton>
          </DialogContent>
        </DialogOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}