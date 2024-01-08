'use client'

import { useEffect, useRef, useState } from 'react'
import { Icons } from './ui/icons'
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { mutate } from 'swr'
import { usePathname } from 'next/navigation'
import { getColor } from '@/lib/deadline'


export default function CardDeadline({spaceId, cardId, card}: {spaceId: string, cardId: string, card: any}) {
  const [dateWasChanged, setDateWasChanged] = useState<boolean>(false)
  const pathname = usePathname()
  const dateInput = useRef<HTMLInputElement>(null)
  const date = new Date()
  
  useEffect(() => {
    if (card.deadline != null) dateInput.current!.value = card.deadline.slice(0,10)
  }, [])

  async function setDeadline(value) {
    let data
    
    if (value == null) {
      data = JSON.stringify({
        deadline: null
      })
    } else {
      data = JSON.stringify({
        deadline: new Date(value)
      })
    }
    
    const response = await fetch(`/api/cards/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data
    })

    if (response.status != 200) {
      toast.custom((t) => (
        <ErrorToast t={t} header={`Что-то пошло не так`} p=""/>
      ))
    }

    if (response.status == 200) {
      mutate(`/api/cards/${cardId}`)
      mutate(`/api/dashboards/${pathname.split('/')[4]}`)
    }

    setDateWasChanged(false)
  }


  if (card.deadline == null) {
    
    return (
      <div className="w-full mt-1">
        <div className="text-lg font-medium flex items-center">Дедлайн: 
          <div className='ml-2 flex items-center gap-2 cursor-pointer'>
            <input
              className='px-1 rounded w-[30px] cursor-pointer'
              onChange={() => {setDeadline(dateInput.current!.value)}}
              ref={dateInput} 
              type='date'
              id='deadline'
              min={`${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDay().toString().padStart(2, '0')}`}
              max={'2100-01-01'}
            />
          </div>
        </div>
      </div>
    )
  } else {

    return (
      <div className="w-full mt-1">
        <div className="text-lg font-medium flex items-center">Дедлайн: 
          <div className='ml-2 flex items-center gap-2 cursor-pointer'>
            <input
              className='px-1 rounded cursor-pointer'
              style={{color: getColor(card.deadline)}}
              onChange={() => {setDateWasChanged(true)}}
              ref={dateInput} 
              type='date'
              id='deadline'
              min={`${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDay().toString().padStart(2, '0')}`}
              max={'2100-01-01'}
            />
            {(dateWasChanged) ? <>
              <div className='flex'>
                <Icons.success onClick={() => {setDeadline(dateInput.current!.value)}} className='opacity-50 hover:opacity-100 transition-all' size={20}/>
                <Icons.close onClick={() => {setDeadline(null)}} className='opacity-50 hover:opacity-100 transition-all text-[red]' size={20}/>
              </div>
            </> : <>
              <Icons.close onClick={() => {setDeadline(null)}} className='opacity-50 hover:opacity-100 transition-all text-[red]' size={20}/>
            </>}
          </div>
        </div>
      </div>
    )
  }
}