import React, { Key, useRef, useState } from 'react'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import { Icons } from './ui/icons'
import ColumnName from './column-name'
import ColumnDelete from './column-delete'
import CardCreate from './card-create'
import Card from './card'
import { useContext } from 'react'
import { TransferContext } from '@/context/transferCard'
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"
import { mutate } from 'swr'
import { usePathname } from 'next/navigation'

type Column = {
  id: string;
  name: string;
  sortOrder: Key;
  tableId: string,
  cards: {
      id: string;
      name: string;
      sortOrder: Number;
      columnId: string;
  }[];
}

type Card = {
  id: string;
  name: string;
  sortOrder: Number;
  columnId: string;
  type?: {
    name?: string,
    color?: string,
    id?: string
  }
}

type TransferContext = {
  transferCard: {
    currentCard?: string,
    currentColumn?: string,
    targetCard?: string,
    targetColumn?: string
  }, 
  setTransferContext: Function
}

export function SortableColumn({column, y, data}: {column: Column, y: number, data: any}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: column.id,
    transition: {
      duration: 300, // milliseconds
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    }
  });
    // @ts-ignore
  const transferContext = useContext<TransferContext>(TransferContext)
  const pathname = usePathname()
  const col = useRef<HTMLDivElement>(null)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function onDragOverHandler(e) {
    e.preventDefault()
    try {
      if (e.target.className.split(' ')[0] == 'column') {
        e.target.style.opacity = '30%'
      } 
    } catch (error) {
      // console.log(error)
    }
  }

  function onDragLeaveHandler(e) {
    e.preventDefault()
    try {
      if (e.target.className.split(' ')[0] == 'column') {
        e.target.style.opacity = '100%'
      }
    } catch (error) {
      // console.log(error)
    }
  }

  function onDropHandler(e) {
    e.preventDefault()
    try {
      if (e.target.className.split(' ')[0] == 'column') {
        col.current!.style.opacity = '100%'
        transferCard(transferContext.transferCard.targetCard)
      }
    } catch (error) {
      // console.log(error)
    }
  }

  async function transferCard(cardId: string | undefined) {
    let data
    if (column.cards.length == 0) {
      data = JSON.stringify({
        columnId: column.id,
        sortOrder: 200
      })
    } else {
      const lastCardIndex = column.cards.length - 1
      data = JSON.stringify({
        columnId: column.id,
        sortOrder: Number(column.cards[lastCardIndex].sortOrder) + 200
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
        <ErrorToast t={t} header={`Что-то пошло не так`}/>
      ))
    }

    if (response.status == 200) {
      mutate(`/api/dashboards/${pathname.split('/')[4]}`)
    }
  }

  column.cards.sort(function (a, b) {
    return Number(a.sortOrder) - Number(b.sortOrder);
  })
  return (
    <div className='group/column' ref={setNodeRef} style={style} >
      <div 
        draggable={false}
        onDragOver={(e) => onDragOverHandler(e)}
        onDragLeave={(e) => onDragLeaveHandler(e)}
        onDrop={(e) => onDropHandler(e)}
        ref={col}
        className="column transition-all duration-300 w-[300px] h-full bg-brand-background dark:bg-brand-background-dark">
          <div style={{top: `-${y - 26}px`}} className="flex justify-between items-center h-[28px] border-b-[1px] bg-brand-background dark:bg-brand-background-dark border-border z-10 sticky pl-2">
            <div className='group/name flex'>
              <ColumnName item={column}/>
              <div className='group-hover/column:opacity-100 opacity-0 transition-opacity duration-300'>
                <Icons.drag className='ml-[-4px] focus:outline-none opacity-50 group-hover/name:opacity-100 transition color cursor-grab active:cursor-grabbing' size={18} {...attributes} {...listeners}/>
              </div>
            </div>
            <ColumnDelete columnId={column.id}/>
          </div>
          <div className="px-2">
            {column.cards.map((card: Card, index) => (
                <Card data={data} column={column} card={card} key={card.id}/>
            ))}
            <CardCreate columnId={column.id}/>
          </div>
      </div>
    </div>
  );
}