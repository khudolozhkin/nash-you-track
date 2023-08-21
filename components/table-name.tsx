'use client'

import { useState, useEffect, useRef, Key } from "react"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { mutate } from "swr"

type Table = {
  name: string,
  id: string,
  top: number,
  left: number,
  columns: {
      name: string;
      sortOrder: Key;
      cards: {
          id: string;
          name: string;
          sortOrder: Number;
          columnId: string;
      }[];
  }[];
}

export default function TableName({table} : {table: Table}) {
  const [value, setValue] = useState<string>(table.name)
  const input = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    input.current!.value = value
  }, [])

  const onChange = () => {
    setValue(input.current!.value)
  }

  const onBlur = () => {
    input.current!.value = table.name
    input.current!.size = table.name.length
    setValue(table.name)
  }

  async function handleKeyDown(event) {
    if (event.key === 'Escape') {
      input.current?.blur()
    }
    if (event.key === 'Enter') {
      let data = JSON.stringify({
        name: value
      })  
  
      const response = await fetch(`/api/tables/${table.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: data
      })
  
      if (response.status != 200) {
        toast.custom((t) => (
          <ErrorToast t={t} header={`Что-то пошло не так`}/>
        ))
      }
  
      if (response.status == 200) {
        let responseBody = await response.json()
        mutate(`/api/dashboards/${responseBody.dashboardId}`)
        toast.custom((t) => (
          <SuccessToast t={t} header={`Название изменено`}/>
        ))
        input.current!.value = responseBody.updateTable.name
      }
    }
  };

  return (
    <>
      <input ref={input} onBlur={onBlur} onKeyDown={(e) => {handleKeyDown(e)}} onChange={onChange} maxLength={32} className="mb-[2px] text-lg h-[22px] outline-none bg-brand-background dark:bg-brand-background-dark" size={value.length}/>
    </>
  )
}