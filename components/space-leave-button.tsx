'use client'

import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { Icons } from './ui/icons';
import { AlertContent, AlertOverlay } from './ui/alert-dialog';
import { AlternativeButton, DeleteButton } from './ui/button';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"

export default function LeaveSpace({ spaceId, userId }: {spaceId: string, userId: string}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [spaces, setSpaces] = useState(JSON.parse(localStorage.getItem(`${userId}spaces`) || "[]"))
  const [isPinned, setIsPinned] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    localStorage.setItem(`${userId}spaces`, JSON.stringify(spaces))

    const filter = spaces.filter((item) => item.id == spaceId)
    if (filter.length > 0) setIsPinned(true)
  }, [spaces])

  const removeSpace = (id: string) => {
    const newSpaces = spaces.filter((item) => item.id != id)
    setSpaces(newSpaces)
    setIsPinned(false)
  }
  
  async function leaveSpace() {
    setLoading(true)

    const response = await fetch(`/api/spaces/${spaceId}/members/${userId}`, { method: "DELETE"})

    if (response.status != 200) {
      router.refresh()
      toast.custom((t) => (
        <ErrorToast t={t} header={`Что-то пошло не так`}/>
      ))
    }

    if (response.status == 200) {
      router.refresh();
      toast.custom((t) => (
        <SuccessToast t={t} header={`Вы покинули пространство`}/>
      ))
    }
    
    setLoading(false)
    removeSpace(spaceId)
  }

  return (
    <div onClick={leaveSpace} className="cursor-pointer text-delete-dark hover:!text-delete relative flex cursor-default select-none items-center rounded-md text-sm outline-none transition-colors hover:bg-hover-item dark:hover:bg-hover-item-dark data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
      {loading ? <Icons.loader className="animate-spin mr-2" size={20}/> : <Icons.delete size={20} className='mr-2'/>}
      Покинуть
    </div>
  )
}