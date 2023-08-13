'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "./ui/icons"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"

export function DashboardCreate({spaceId} : {spaceId: string}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  async function createDashboard() {
    setIsLoading(true)
    
    const data = JSON.stringify({
      name: "Новая доска",
      spaceId: spaceId
    })

    const response = await fetch(`/api/dashboards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data
    })

    if (response.status != 200) {
      toast.custom((t) => (
        <ErrorToast t={t} header="Что-то пошло не так"/>
      ))
    }

    if (response.status == 200) {
      let responseBody = await response.json()
      setIsLoading(false)
      router.push(`/space/${spaceId}/dashboard/${responseBody.id}`)
      router.refresh()
      toast.custom((t) => (
        <SuccessToast t={t} header="Новая доска успешно создана"/>
      ))
    }

    setIsLoading(false)
  }

  return (
    <a onClick={createDashboard} className="leading-6 scale-[0.85] border-dashed gap-2 rounded opacity-30 border-2 hover:opacity-100 border-border dark:border-border-dark hover:bg-hover-item dark:hover:bg-hover-item-dark transition-colors flex w-full relative cursor-pointer items-center justify-center rounded-md px-1 py-1 text-lg md:text-xl font-medium">
        Создать 
        {isLoading ? <Icons.loader size={24} className={`animate-spin duration-200 ease-in`}/> : <Icons.add size={24} className={`duration-200 ease-in`}/>}
    </a>
  )
}