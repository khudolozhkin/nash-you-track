'use client'

import { usePathname, useRouter } from "next/navigation";
import { Icons } from "./ui/icons"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { mutate } from "swr";

export default function CardDelete({cardId}: {cardId: string}) {
  const router = useRouter()
  const pathname = usePathname()
  
  async function deleteCard () {
    
    const response = await fetch(`/api/cards/${cardId}`, { method: "DELETE"})

    if (response.status != 200) {
      router.refresh();
      toast.custom((t) => (
        <ErrorToast t={t} header={`Что-то пошло не так`} p="Попробуйте еще раз"/>
      ))
    }

    if (response.status == 200) {
      router.back()
      mutate(`/api/dashboards/${pathname.split('/')[4]}`)
    }

  }
  
  return (
    <div onClick={deleteCard} className="cursor-pointer text-delete-dark hover:!text-delete relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-hover-item dark:hover:bg-hover-item-dark">
      <div className="flex items-center"><Icons.delete size={18} className="mr-2"/> Удалить</div>
    </div>
  )
}