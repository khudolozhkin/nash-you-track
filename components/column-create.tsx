'use client'

import toast from 'react-hot-toast'
import { SuccessToast, ErrorToast } from "./ui/toast"
import { useState } from 'react'
import { Icons } from './ui/icons'
import { usePathname, useRouter } from 'next/navigation'
import { mutate } from 'swr'

export default function ColumnCreate({tableId, swrData} : {tableId: string, swrData: any}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname()
  const router = useRouter()

  async function onSubmit() {
    setIsLoading(true)

    let data = JSON.stringify({
      tableId: tableId
    })
    const response = await fetch(`/api/columns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data
    })

    if (response.status != 200) {
      toast.custom((t) => (
        <ErrorToast t={t} header={`Что-то пошло не так`}/>
      ))
    }

    if (response.status == 200) {
      let responseBody = await response.json()
      mutate(`/api/dashboards/${pathname.split('/')[4]}`, {swrData})
      toast.custom((t) => (
        <SuccessToast t={t} header={`Создана новая колонка`}/>
      ))
    }

    setIsLoading(false)
  }

  return (
    <>
      <div onClick={onSubmit} className="flex items-center">{isLoading ? <Icons.loader size={18} className="mr-2 animate-spin"/> : <Icons.add size={18} className="mr-2"/>}Столбец</div>
    </>
  )
}