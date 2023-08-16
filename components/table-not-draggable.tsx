'use client'

import Draggable from 'react-draggable'
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { mutate } from 'swr'
import { useRouter } from 'next/navigation'

type Table = {
    name: string,
    top: number,
    left: number,
    id: string,
    columns: {
        name: string;
        sortOrder: Number;
        cards: {
            id: string;
            name: string;
            sortOrder: Number;
            columnId: string;
        }[];
    }[];
}

export default function TableNonDraggable({table, dashboardId} : {table: Table, dashboardId: string,}) {


  return (
    <div className='w-[1px] h-[1px]' style={{transform: `translate(${table.left}px, ${table.top}px)`}}>
      <div className='h-[100px] w-[100px] bg-brand-background-dark'></div>
    </div>
  )
}