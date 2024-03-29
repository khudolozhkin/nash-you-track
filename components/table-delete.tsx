'use client'

import { DropdownMenuItem } from "./ui/dropdown"
import { Icons } from "./ui/icons"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { mutate } from "swr"
import { useRouter, usePathname } from "next/navigation"
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { AlertContent, AlertOverlay } from './ui/alert-dialog';
import { AlternativeButton, DeleteButton } from './ui/button';
import { useState, useEffect } from 'react';


export default function TableDelete({tableId} : {tableId: string}) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState<boolean>(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)

  async function deleteTable() {
    setLoading(true)
    
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

    setShowDeleteAlert(false)
    setLoading(false)
  } 
  
  return (
    <>
      <AlertDialog.Root open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
      <AlertDialog.Trigger asChild>
        <div className="cursor-pointer text-delete-dark hover:!text-delete relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-hover-item dark:hover:bg-hover-item-dark">
            <div className="flex items-center"><Icons.delete size={18} className="mr-2"/> Удалить</div>
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
              <DeleteButton onClick={deleteTable} className="ml-2">{loading ? <Icons.delete className="animate-spin mr-2" size={20}/> : <Icons.delete size={20} className='mr-2'/>}Удалить</DeleteButton>
            </div>
          </AlertContent>
        </AlertOverlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
    </>
  )
}