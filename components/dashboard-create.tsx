'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "./ui/icons"

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
      // catch error
    }

    if (response.status == 200) {
      let responseBody = await response.json()
      console.log(responseBody)
      setIsLoading(false)
      router.push(`/space/${spaceId}/dashboard/${responseBody.id}`)
      router.refresh()
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