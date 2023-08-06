'use client'

import { useState } from "react"
import { Dashboard } from "@prisma/client"
import { Icons } from "./ui/icons"
import { useRouter } from "next/navigation"

export default function SpaceSetting({spaceId}: {spaceId: string}) {
  const router = useRouter()

  return (
    <>
      <li className="list-none mt-2">
        <a onClick={() => {router.push(`/space/${spaceId}/settings`)}} className="rounded hover:bg-hover-item dark:hover:bg-hover-item-dark transition-colors flex w-full relative cursor-pointer items-center justify-between rounded-md px-1 py-1 text-lg md:text-xl font-medium">
          Настройки 
          <Icons.settings size={20} className={`duration-200 ease-in`}/>
        </a>
      </li>
    </>
  )
}