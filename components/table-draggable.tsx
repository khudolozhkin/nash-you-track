'use client'

import Draggable from 'react-draggable'
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import Table from './table'
import { useState, Key } from 'react'

type Table = {
    name: string,
    top: number,
    left: number,
    id: string,
    columns: {
        id: string  
        name: string;
        sortOrder: Key;
        tableId: string;
        cards: {
            id: string;
            name: string;
            sortOrder: Number;
            columnId: string;
            type?: {
              name?: string,
              color?: string,
              id?: string
            },
            responsibleUsers: []
        }[];
    }[];
}

export default function TableDraggable({table, dashboardId, swrData} : {swrData: any, table: Table, dashboardId: string,}) {
  const [leftState, setLeftState] = useState<number>(table.left)
  const [topState, setTopState] = useState<number>(table.top)

  const onChangePosition = (e, ui) => {
    updatePosition(ui.x, ui.y)
    setLeftState(ui.x)
    setTopState(ui.y)
  }

  async function updatePosition(x, y) {
    
    let data = JSON.stringify({
      left: x,
      top: y
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
        <ErrorToast t={t} header="Что-то пошло не так"/>
      ))
    }

    if (response.status == 200) {
      setLeftState(x)
      setTopState(y)
    }
  }

  return (
    <Draggable
      axis="both"
      defaultPosition={{x: leftState, y: topState}}
      grid={[1, 1]}
      scale={1}
      bounds={{left: 0, top: 0}}
      onStop={onChangePosition}
      handle=".handle"
    >
      <div className='w-[1px] h-[1px] pr-[1000px]'>
        <Table swrData={swrData} x={leftState} y={topState} table={table}/>
      </div>
    </Draggable>
  )
}