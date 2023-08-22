'use client'

import { Icons } from "./ui/icons"
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { AlertContent, AlertOverlay } from './ui/alert-dialog';
import { AlternativeButton, DeleteButton } from './ui/button';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { mutate } from "swr";

export default function ColumnDelete({columnId}: {columnId: string}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()
  
  async function deleteColumn() {
    setLoading(true)

    const response = await fetch(`/api/columns/${columnId}`, { method: "DELETE"})

    if (response.status != 200) {
      router.refresh();
      toast.custom((t) => (
        <ErrorToast t={t} header={`Что-то пошло не так`}/>
      ))
    }

    if (response.status == 200) {
      mutate(`/api/dashboards/${pathname.split('/')[4]}`)
      toast.custom((t) => (
        <SuccessToast t={t} header={`Колонка удалена`}/>
      ))
    }

    setShowDeleteAlert(false)
    setLoading(false)
  }
  
  return (
    <>
      <AlertDialog.Root open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
      <AlertDialog.Trigger asChild>
        <div className='transition-opacity group-hover/column:opacity-100 opacity-0 group/delete cursor-pointer'>
          <Icons.delete size={18} className='transition-opacity text-delete dark:text-delete-dark mr-2 opacity-50 group-hover/delete:opacity-100'/>
        </div>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertOverlay>
          <AlertContent>
            <h1 className="font-semibold md:text-lg text-primary dark:text-primary-dark">Вы уверены, что хотите удалить эту колонку?</h1>
            <p className="text-lg font-light text-secondary dark:text-secondary-dark">Действие нельзя будет отменить, все карточки также будут удалены</p>
            <div className='max-w-100% flex justify-end mt-4'>
              <AlertDialog.Cancel>
                <AlternativeButton>Назад</AlternativeButton>
              </AlertDialog.Cancel>
              <DeleteButton onClick={deleteColumn} className="ml-2">{loading ? <Icons.delete className="animate-spin mr-2" size={20}/> : <Icons.delete size={20} className='mr-2'/>}Удалить</DeleteButton>
            </div>
          </AlertContent>
        </AlertOverlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
    </>
  )
}