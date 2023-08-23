'use client'

import { useState, useEffect, useRef, Key } from "react"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { mutate } from "swr"

export default function ColumnName({item} : {item: any}) {
  const [value, setValue] = useState<string>(item.name)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    input.current!.value = value
  }, [])

  const onChange = () => {
    if (input.current!.value.length > 0) {
      input.current!.size = input.current!.value.length
    }
  }

  const onBlur = () => {
    input.current!.value = value
    input.current!.size = value.length
  }

  async function handleKeyDown(event) {
    if (event.key === 'Escape') {
      input.current?.blur()
    }
    if (event.key === 'Enter') {
      setValue(input.current!.value)
      let data = JSON.stringify({
        name: input.current!.value
      })
  
      const response = await fetch(`/api/columns/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data
      })
  
      if (response.status != 200) {
        toast.custom((t) => (
          <ErrorToast t={t} header={`Что-то пошло не так`} p="Название должно быть больше 2 символов"/>
        ))
      }
  
      if (response.status == 200) {
        let responseBody = await response.json()
        mutate(`/api/dashboards/${responseBody.dashboardId}`)
        toast.custom((t) => (
          <SuccessToast t={t} header={`Название изменено`}/>
        ))
      }
    }
  };

  return (
    <>
      <input ref={input} onBlur={onBlur} onChange={onChange} onKeyUp={(e) => {handleKeyDown(e)}} maxLength={32} className="mb-[2px] max-w-[200px] h-[18px] outline-none bg-brand-background dark:bg-brand-background-dark" size={value.length}/>
    </>
  )
}