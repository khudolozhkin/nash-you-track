'use client'

import { AlternativeButton } from './ui/button'
import {useState, useRef} from 'react'
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { useRouter } from 'next/navigation'
import { mutate } from 'swr'
import { Icons } from './ui/icons'

export default function TableCreate({x, y, dashboardId, setOpen} : {x: number, y:number, dashboardId: string, setOpen: Function}) {
  const [loading, setLoading] = useState<boolean>(false)
  const tableCount = useRef<HTMLSelectElement>(null)
  const tableName = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function createTable() {
    setLoading(true)

    let data = JSON.stringify({
      data: {
        name: tableName.current?.value,
        top: y,
        left: x,
        dashboardId: dashboardId
      },
      tableCount: Number(tableCount.current?.value)
    })
    
    const response = await fetch(`/api/tables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data
    })

    if (response.status != 200) {
      if (response.status == 422) {
        let valid = await response.json()
        toast.custom((t) => (
          <ErrorToast t={t} header="Что-то пошло не так" p={valid[0]!.message}/>
        ))
      } else {
        toast.custom((t) => (
          <ErrorToast t={t} header="Что-то пошло не так"/>
        ))
      }
    }

    if (response.status == 200) {
      let responseBody = await response.json()
      mutate(`/api/dashboards/${dashboardId}`)
      setOpen(false)
      toast.custom((t) => (
        <SuccessToast t={t} header={`Создана новая таблица ${responseBody.name}`}/>
      ))
    }

    setLoading(false)
  }

  return (
    <div className="">
        <h2 className="font-semibold text-lg md:text-xl text-primary dark:text-primary-dark">Создание таблицы</h2>
        <div className="pt-2 flex flex-col">
          <label className="font-light pb-1">Название</label>
          <input ref={tableName} maxLength={32} minLength={3} name="name" className="h-[30px] pl-2 rounded-md w-[200px] md:w-[300px]"/>
        </div>
        <div className='flex mt-2'>
          <label className="font-light pb-1">Количество столбцов</label>
          <select ref={tableCount} name="select" className='ml-2 rounded-md cursor-pointer'>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3" selected>3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
        <AlternativeButton className="mt-4" onClick={createTable}>{(loading) ? <Icons.loader className="animate-spin mr-2" size={20}/> : <></>} Создать таблицу</AlternativeButton>
    </div>
  )
}