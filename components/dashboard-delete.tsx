'use client'

import { useState, useRef } from "react"
import { DeleteButton } from "./ui/button"
import { Icons } from "./ui/icons"
import { useRouter, usePathname } from "next/navigation"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"

export default function DashboardDelete({id, open, setOpen}: {id: string, open: boolean, setOpen: Function}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const nameInput = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  async function deleteDashboard() {
    setIsLoading(true)

    const response = await fetch(`/api/dashboards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status != 200) {
      toast.custom((t) => (
        <ErrorToast t={t} header="Что-то пошло не так"/>
      ))
    }

    if (response.status == 200) {
      let responseBody = await response.json()
      router.push(`/space/${pathname.split('/')[2]}`)
      router.refresh()
      toast.custom((t) => (
        <SuccessToast t={t} header={`Доска удалена`}/>
      ))
      setOpen(false)
    }

    setIsLoading(false)
  }

  return (
    <>
      <h1 className="font-semibold md:text-lg text-primary dark:text-primary-dark">Вы уверены, что хотите удалить эту доску?</h1>
      <p className="text-lg font-light text-secondary dark:text-secondary-dark">Действие нельзя будет отменить</p>
      <DeleteButton onClick={deleteDashboard} className="mt-2">{(isLoading) ? <Icons.delete className="animate-spin mr-2" size={20}/> : <Icons.delete className="mr-2" size={20}/>} Удалить</DeleteButton>
    </>
  )
}