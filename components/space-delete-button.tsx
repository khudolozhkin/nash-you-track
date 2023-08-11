'use client'

import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { Icons } from './ui/icons';
import { AlertContent, AlertOverlay } from './ui/alert-dialog';
import { AlternativeButton, DeleteButton } from './ui/button';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function DeleteSpace({ spaceId, userId, setActive, name }: {name: string, spaceId: string, userId: string, setActive: Function}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
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
  
  async function deleteSpace(spaceId: string) {
    setLoading(true)

    const response = await fetch(`/api/spaces/${spaceId}`, { method: "DELETE"})

    if (response.status != 200) {
      // error catch
      router.refresh();
    }

    if (response.status == 200) {
      router.push(`/space`)
      router.refresh();
    }
    setShowDeleteAlert(false)
    setLoading(false)
    removeSpace(spaceId)
    setActive(false)
  }

  return (
    <AlertDialog.Root open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
      <AlertDialog.Trigger asChild>
        <div className="cursor-pointer text-delete-dark hover:!text-delete relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-hover-item dark:hover:bg-hover-item-dark data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          <Icons.delete size={20} className="mr-2"/>
          {name}
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertOverlay>
          <AlertContent>
            <h1 className="font-semibold md:text-lg text-primary dark:text-primary-dark">Вы уверены, что хотите удалить это пространство?</h1>
            <p className="text-lg font-light text-secondary dark:text-secondary-dark">Действие нельзя будет отменить</p>
            <div className='max-w-100% flex justify-end mt-4'>
              <AlertDialog.Cancel>
                <AlternativeButton>Назад</AlternativeButton>
              </AlertDialog.Cancel>
              <DeleteButton onClick={() => {deleteSpace(spaceId)}} className="ml-2">{loading ? <Icons.delete className="animate-spin mr-2" size={20}/> : <Icons.delete size={20} className='mr-2'/>}Удалить</DeleteButton>
            </div>
          </AlertContent>
        </AlertOverlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}