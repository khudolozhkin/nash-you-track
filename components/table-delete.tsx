'use client'

import { DropdownMenuItem } from "./ui/dropdown"
import { Icons } from "./ui/icons"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { mutate } from "swr"
import { useRouter, usePathname } from "next/navigation"

export default function TableDelete({tableId} : {tableId: string}) {
  const router = useRouter()
  const pathname = usePathname()
  async function deleteTable() {
    const response = await fetch(`/api/tables/${tableId}`, {
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
      mutate(`/api/dashboards/${responseBody.dashboardId}`)
      router.refresh()
      toast.custom((t) => (
        <SuccessToast t={t} header={`Таблица удалена`}/>
      ))
    }

  } 
  
  return (
    <>
      <DropdownMenuItem className="cursor-pointer text-delete-dark hover:!text-delete relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-hover-item dark:hover:bg-hover-item-dark" asChild>
          <div onClick={deleteTable} className="flex items-center"><Icons.delete size={18} className="mr-2"/> Удалить</div>
      </DropdownMenuItem>
    </>
  )
}